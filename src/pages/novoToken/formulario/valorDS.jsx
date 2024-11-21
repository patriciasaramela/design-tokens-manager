import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Context from '../context';
import CustomTextField from './customFields/CustomTextField';
import InputLabel from '@mui/material/InputLabel';
import CustomAutocomplete from './customFields/CustomAutocomplete';
import useConfigStore from '../../../config/stores/useConfigStore';
import { isNil } from 'ramda';
import { transformOptionListItens } from '../../../config/utils/utils';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Stack } from '@mui/material';

const ValorDS = () => {
  const {
    categoriaToken,
    tokenPrimitivoDS,
    tokenSemanticoDS,
    primitiveData,
    semanticData,
    useGlobalValue,
    setUseGlobalValue
  } = useContext(Context);
  const { designSystem } = useConfigStore();
  const [optionPrimitivo, setOptionPrimitivo] = useState([]);
  const [optionSemantico, setOptionSemantico] = useState([]);

  useEffect(() => {
    if (categoriaToken !== "Primitivo") {
      const newOptions = transformOptionListItens(primitiveData, "Primitivo", designSystem);
      setOptionPrimitivo(newOptions)
    }
    if (categoriaToken === "Componente") {
      const newOptions = transformOptionListItens(semanticData, "Semântico", designSystem);
      setOptionSemantico(newOptions)
    }
  }, [categoriaToken]);

  return (
    <Paper style={{ padding: '12px 14px', marginBottom: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h6" color="#4d4d4d" gutterBottom>Valor {designSystem}</Typography>

            <FormControlLabel control={<Switch checked={useGlobalValue} onChange={() => setUseGlobalValue(!useGlobalValue)} size="small" />} label="Usar valores globais" />
          </Stack>

        </Grid>
        {!useGlobalValue &&
          <>
            {/* TOKEN PRIMITIVO */}
            {categoriaToken !== 'Primitivo' &&
              <>
                <Grid item xs={12} md={3}>
                  <LabelValues>
                    <InputLabel id="select-primitivo-DS-label">Token primitivo</InputLabel>
                  </LabelValues>
                </Grid>
                <Grid item xs={12} md={9}>
                  <CustomAutocomplete
                    id="select-primitivo-DS"
                    name="tokenPrimitivoDS"
                    options={optionPrimitivo}
                    disabled={!isNil(tokenSemanticoDS)}
                  />
                </Grid>
              </>
            }

            {/* TOKEN SEMÂNTICO */}
            {categoriaToken !== 'Primitivo' && categoriaToken !== 'Semântico' &&
              <>
                <Grid item xs={12} md={3}>
                  <LabelValues>
                    <InputLabel id="select-semantico-DS-label">Token semântico</InputLabel>
                  </LabelValues>
                </Grid>
                <Grid item xs={12} md={9}>
                  <CustomAutocomplete
                    id="select-semantico-DS"
                    name="tokenSemanticoDS"
                    options={optionSemantico}
                    disabled={!isNil(tokenPrimitivoDS)}
                  />
                </Grid>
              </>
            }


            {/* VALOR */}
            <Grid item xs={12} md={3}>
              <LabelValues>
                <InputLabel id="input-value-DS-label">Valor</InputLabel>
              </LabelValues>
            </Grid>
            <Grid item xs={12} md={9}>
              <CustomTextField
                id="input-value-DS"
                name="ValorTokenDS"
                disabled={!isNil(tokenSemanticoDS) || !isNil(tokenPrimitivoDS)}
                helperText="Preencher somente se o valor for diferente do global"
              />
            </Grid>
          </>
        }
      </Grid>
    </Paper>

  )
}

export default ValorDS


const LabelValues = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;