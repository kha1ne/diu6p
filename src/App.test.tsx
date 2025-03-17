import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { Players } from './Constants';

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
  });

  test('enables Create Table button when all players are selected', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dropdowns = screen.getAllByRole('combobox');

    for (let i = 0; i < dropdowns.length; i++) {
      await user.click(dropdowns[i]);
      const playerOption = screen.getByRole('option', { name: Players.list[i] });
      await user.click(playerOption);
    }

    const createTableButton = screen.getByText('Create Table');
    expect(createTableButton).toBeEnabled();
  });
});
