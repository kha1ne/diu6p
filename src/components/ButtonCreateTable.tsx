import { Button } from '@mui/material';
import type { MouseEventHandler } from 'react';

interface ButtonCreateTableProps {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

function ButtonCreateTable({ disabled = false, onClick, label = 'Create Table', variant = 'contained', color = 'primary' }: ButtonCreateTableProps) {
  return (
    <Button disabled={disabled} variant={variant} color={color} onClick={onClick} aria-label={label}>
      {label}
    </Button>
  );
}

export default ButtonCreateTable;
