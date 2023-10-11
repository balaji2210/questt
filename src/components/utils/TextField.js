import { TextField as MuiTextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextField = ({
  name = "",
  label = "",
  control = {},
  type = "",
  required = false,
  placeholder = "",
  errorMsg = "",
  readyOnlyBorderColor = "",
  disabled = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      required={required}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MuiTextField
          placeholder={placeholder}
          type={type}
          label={label}
          error={!!errorMsg || !!error}
          helperText={errorMsg || (error ? error?.message : null)}
          onChange={onChange}
          value={value}
          readyOnlyBorderColor={readyOnlyBorderColor}
          fullWidth
          variant="outlined"
          disabled={disabled}
          {...props}
        />
      )}
    />
  );
};

export default TextField;
