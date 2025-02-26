import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonCreateTable({
  disabled = false,
  onClick,
  label = 'Create Table',
  variant = 'contained',
  color = 'primary'
}) {
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
  label: PropTypes.string,
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

export default ButtonCreateTable;
