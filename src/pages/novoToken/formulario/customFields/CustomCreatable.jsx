import Context from '../../context';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const filter = createFilterOptions();

const CustomCreatable = props => {
  const { control } = useContext(Context);

  return (
    <Controller
      control={control}
      name={props.name}
      rules={{
        required: props.required,
      }}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth margin="normal" size="small">
          <Autocomplete
            onChange={(event, item) => {
              if (item.inputValue) {
                onChange(
                  {label: item.inputValue, value: item.inputValue}
                );
              } else {
                onChange(item);
              }

            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.label);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  label: `Adicionar "${inputValue}"`,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  {option.label}
                </li>
              );
            }}
            fullWidth
            value={value}
            options={props.options}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label}
              />
            )}
          />
        </FormControl>
      )}
    />
  );
};

export default CustomCreatable;
