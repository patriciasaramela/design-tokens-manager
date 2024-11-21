import Context from '../../context';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CustomSelect = props => {
  const { control } = useContext(Context);
  return (
    <Controller
      control={control}
      name={props.name}
      rules={{
        required: props.required,
      }}
      render={({ field }) => (
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
          <Select {...field} labelId={`${props.id}-label`} required={props.required} id={props.id} label={props.label}>
            {props.options.map(element => <MenuItem key={element.value} value={element.value}>{element.label}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default CustomSelect;
