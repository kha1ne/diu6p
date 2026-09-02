import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';
import NotFoundPage from '../src/pages/NotFoundPage';
import { Players } from '../src/utils/constants';

async function selectAllPlayers(user: ReturnType<typeof userEvent.setup>) {
  const dropdowns = screen.getAllByRole('combobox');

  for (let i = 0; i < dropdowns.length; i++) {
    await user.click(dropdowns[i]);
    await user.click(screen.getByRole('option', { name: Players.list[i] }));
  }
}

describe('App Component', () => {
  test('renders initial state correctly', () => {
    render(<App />);

    const createTableButton = screen.getByText('Create Table');
    expect(createTableButton).toBeInTheDocument();
    expect(createTableButton).toBeDisabled();

    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns).toHaveLength(6);
    dropdowns.forEach(dropdown => {
      expect(dropdown).toHaveTextContent(Players.defaultDropdownValue);
    });

    const manualSelectionRadio = screen.getByRole('radio', { name: /No Selection/i });
    const randomAssignmentRadio = screen.getByRole('radio', { name: /Random Assignment/i });
    const draftPoolRadio = screen.getByRole('radio', { name: /Draft Pool/i });

    expect(manualSelectionRadio).toBeChecked();
    expect(randomAssignmentRadio).not.toBeChecked();
    expect(draftPoolRadio).not.toBeChecked();

    const bloodlinesCheckbox = screen.getByRole('checkbox', { name: /Use Bloodlines Leaders/i });
    const authenticCheckbox = screen.getByRole('checkbox', { name: /Authentic Story Experience/i });

    expect(bloodlinesCheckbox).toBeDisabled();
    expect(authenticCheckbox).toBeDisabled();
  });

  test('enables bloodlines and authentic checkboxes when Random Assignment is selected', () => {
    render(<App />);

    const randomAssignmentRadio = screen.getByRole('radio', { name: /Random Assignment/i });
    fireEvent.click(randomAssignmentRadio);

    const bloodlinesCheckbox = screen.getByRole('checkbox', { name: /Use Bloodlines Leaders/i });
    const authenticCheckbox = screen.getByRole('checkbox', { name: /Authentic Story Experience/i });

    expect(bloodlinesCheckbox).toBeEnabled();
    expect(authenticCheckbox).toBeEnabled();

    fireEvent.click(bloodlinesCheckbox);
    fireEvent.click(authenticCheckbox);
    fireEvent.click(screen.getByRole('radio', { name: /No Selection/i }));

    expect(bloodlinesCheckbox).not.toBeChecked();
    expect(authenticCheckbox).not.toBeChecked();
    expect(bloodlinesCheckbox).toBeDisabled();
    expect(authenticCheckbox).toBeDisabled();
  });

  test('enables Create Table button when all players are selected', async () => {
    render(<App />);
    const user = userEvent.setup();

    await selectAllPlayers(user);

    const createTableButton = screen.getByText('Create Table');
    expect(createTableButton).toBeEnabled();
  });

  test('shows draft pool when Draft Pool is selected and Create Table is clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    const draftPoolRadio = screen.getByRole('radio', { name: /Draft Pool/i });
    await user.click(draftPoolRadio);

    await selectAllPlayers(user);

    const createTableButton = screen.getByText('Create Table');
    await user.click(createTableButton);

    const gridItems = screen.getAllByTestId(/^draft-pool-item-/);
    expect(gridItems).toHaveLength(10);
  });

  test('creates an authentic random table using Bloodlines leaders', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('radio', { name: /Random Assignment/i }));
    await user.click(screen.getByRole('checkbox', { name: /Use Bloodlines Leaders/i }));
    await user.click(screen.getByRole('checkbox', { name: /Authentic Story Experience/i }));
    await selectAllPlayers(user);
    await user.click(screen.getByRole('button', { name: 'Create Table' }));

    expect(screen.queryByTestId(/^draft-pool-item-/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Table' })).toBeEnabled();
  });

  test('renders the not-found page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
