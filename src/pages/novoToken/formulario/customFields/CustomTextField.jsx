import Context from '../../context';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';


const CustomTextField = props => {
  const { control } = useContext(Context);
  return (
    <Controller
      control={control}
      name={props.name}
      rules={{
        required: props.required,
      }}
        render={({ field: { onChange, value, ref } }) => (
        <TextField
          label={props.label}
          id={props.id}
          fullWidth
          margin="normal"
          size={props.multiline ? "" : "small"}
          required={props.required}
          placeholder={props.placeholder}
          multiline={props.multiline}
          disabled={props.disabled}
          row={2}
          inputRef={ref}
          value={value}
          onChange={val => onChange(val)}
          helperText={props.helperText}
        />
      )}
    />
  );
};

export default CustomTextField;
