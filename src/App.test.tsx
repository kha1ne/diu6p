import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { Players } from './Constants';

describe('App Component', () => {
  test('renders initial state correctly', () => {
    render(<App />);

    // Check if Create Table button exists and is disabled initially
    const createTableButton = screen.getByText('Create Table');
    expect(createTableButton).toBeInTheDocument();
    expect(createTableButton).toBeDisabled();

    // Check if all player dropdowns exist with default value
    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns).toHaveLength(6);
    dropdowns.forEach(dropdown => {
      expect(dropdown).toHaveTextContent(Players.defaultDropdownValue);
    });

    // Check if checkboxes exist and are unchecked
    const assignLeadersCheckbox = screen.getByRole('checkbox', { name: /Assign Random Allies/i });
    const bloodlinesCheckbox = screen.getByRole('checkbox', { name: /Use Bloodlines Leaders/i });
    const authenticCheckbox = screen.getByRole('checkbox', { name: /Authentic Story Experience/i });

    expect(assignLeadersCheckbox).not.toBeChecked();
    expect(bloodlinesCheckbox).toBeDisabled();
    expect(authenticCheckbox).toBeDisabled();
  });

  test('enables bloodlines and authentic checkboxes when assign leaders is checked', () => {
    render(<App />);

    const assignLeadersCheckbox = screen.getByRole('checkbox', { name: /Assign Random Allies/i });
    fireEvent.click(assignLeadersCheckbox);

    const bloodlinesCheckbox = screen.getByRole('checkbox', { name: /Use Bloodlines Leaders/i });
    const authenticCheckbox = screen.getByRole('checkbox', { name: /Authentic Story Experience/i });

    expect(bloodlinesCheckbox).toBeEnabled();
    expect(authenticCheckbox).toBeEnabled();
  });

  test('enables Create Table button when all players are selected', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dropdowns = screen.getAllByRole('combobox');

    // Select players for each dropdown
    for (let i = 0; i < dropdowns.length; i++) {
      await user.click(dropdowns[i]);
      const playerOption = screen.getByRole('option', { name: Players.list[i] });
      await user.click(playerOption);
    }

    const createTableButton = screen.getByText('Create Table');
    expect(createTableButton).toBeEnabled();
  });
});
