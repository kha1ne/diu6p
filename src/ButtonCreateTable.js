import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonCreateTable({ disabled, onClick, label, variant, color }) {
  return (
    <Button
      disabled={disabled}
      variant={variant}
      color={color}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </Button>
  );
}

ButtonCreateTable.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info'
  ])
};

ButtonCreateTable.defaultProps = {
  disabled: false,
  variant: 'contained',
  color: 'primary'
};

export default ButtonCreateTable;
