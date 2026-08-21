import { render } from '@testing-library/react';

import App from '../src/App';

describe('main component', () => {
  test('renders App component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
