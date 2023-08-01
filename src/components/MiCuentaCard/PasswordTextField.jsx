/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const PasswordTextField = ({ label, name, value, onChange, validate }) => {
  const { error, helperText } = validate(value);

  return (
    <TextField
      label={label}
      variant="filled"
      fullWidth
      name={name}
      type="password"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      autoComplete="off"
    />
  );
};

export default PasswordTextField;
