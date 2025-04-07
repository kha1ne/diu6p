import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import App from './App';

describe('index component', () => {
  test('renders App component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
