import { AppLogger } from '../src/utils/logger';
import { LogLevel } from '../src/utils/loggerTypes';

function makeLogger(overrides?: ConstructorParameters<typeof AppLogger>[0]) {
  return new AppLogger(overrides);
}

afterEach(() => {
  vi.restoreAllMocks();
});

test('logs error messages and metadata via console.error', () => {
  const spy = vi.spyOn(console, 'error').mockReturnValue(undefined);
  const log = makeLogger({ level: LogLevel.ERROR });

  log.error('boom', { key: 'value' });

  expect(spy).toHaveBeenCalledOnce();
  expect(spy.mock.calls[0][0]).toContain('[ERROR]');
  expect(spy.mock.calls[0][0]).toContain('boom');
  expect(spy.mock.calls[0][0]).toContain('{"key":"value"}');
});

test('logs info and debug messages at the configured level', () => {
  const infoSpy = vi.spyOn(console, 'info').mockReturnValue(undefined);
  const debugSpy = vi.spyOn(console, 'debug').mockReturnValue(undefined);
  const log = makeLogger({ level: LogLevel.DEBUG });

  log.info('hello');
  log.debug('trace');

  expect(infoSpy.mock.calls[0][0]).toContain('[INFO]');
  expect(debugSpy.mock.calls[0][0]).toContain('[DEBUG]');
});

test('suppresses messages below the configured level', () => {
  const spy = vi.spyOn(console, 'debug').mockReturnValue(undefined);
  const log = makeLogger({ level: LogLevel.ERROR });

  log.debug('should not appear');

  expect(spy).not.toHaveBeenCalled();
});

test('includes a timestamp by default and can omit it', () => {
  const spy = vi.spyOn(console, 'info').mockReturnValue(undefined);

  makeLogger({ level: LogLevel.INFO }).info('timestamped');
  makeLogger({ level: LogLevel.INFO, timestamp: false }).info('plain');

  expect(spy.mock.calls[0][0]).toMatch(/\[\d{4}-\d{2}-\d{2}T/);
  expect(spy.mock.calls[1][0]).not.toMatch(/\[\d{4}-\d{2}-\d{2}T/);
});

test('child loggers combine parent and child prefixes', () => {
  const spy = vi.spyOn(console, 'info').mockReturnValue(undefined);
  const parent = makeLogger({ level: LogLevel.INFO, prefix: 'Parent' });

  parent.child('Child').info('nested');
  makeLogger({ level: LogLevel.INFO }).child('Child').info('direct');

  expect(spy.mock.calls[0][0]).toContain('[Parent:Child]');
  expect(spy.mock.calls[1][0]).toContain('[Child]');
});
