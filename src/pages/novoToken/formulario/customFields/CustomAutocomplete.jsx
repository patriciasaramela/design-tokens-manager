import Context from '../../context';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import fontColorContrast from 'font-color-contrast'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = props => {
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
              onChange(item);
            }}
            fullWidth
            value={value}
            options={props.options}
            size="small"
            //disableClearable
            disabled={props.disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label}
              />
            )}
            renderOption={(props, option) => {
              let styleValue = {}
              if (option.value?.slice(0,1) === '#') {
                styleValue = { background: option.value, color: fontColorContrast(option.value) }
              }
              return (
                <div {...props}>
                  <OptionItem>
                    <Token>{option.label}</Token>
                    <Value style={styleValue}>{option.value}</Value>
                  </OptionItem>
                </div>
              );
            }}
          />
        </FormControl>
      )}
    />
  );
};

export default CustomAutocomplete;


const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Token = styled.div`
  margin: 3px 0;
`;

const Value = styled.div`
  background: #fafafa;
  display: inline-block;
  padding: 2px 6px;
`;