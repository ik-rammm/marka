import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // You can add more specific assertions here
  expect(screen.getByText(/marka/i)).toBeInTheDocument();
});
