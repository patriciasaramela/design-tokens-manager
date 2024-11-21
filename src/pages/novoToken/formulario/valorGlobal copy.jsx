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

const ValorGlobal = () => {
  const {
    categoriaToken,
    valoresSemanticosGlobal,
    tokenPrimitivoGlobal,
    tokenSemanticoGlobal,
    primitiveData,
    semanticData,
  } = useContext(Context);
  const { designSystem } = useConfigStore();

  const [optionPrimitivo, setOptionPrimitivo] = useState([]);
  const [optionSemantico, setOptionSemantico] = useState([]);

  useEffect(() => {
    if (categoriaToken !== "Primitivo") {
      const newOptions = transformOptionListItens(primitiveData, "Primitivo");
      setOptionPrimitivo(newOptions)
    }
    if (categoriaToken === "Componente") {
      const newOptions = transformOptionListItens(semanticData, "Semântico");
      setOptionSemantico(newOptions)
    }
  }, [categoriaToken]);

  return (
    <Paper style={{ padding: '12px 14px', marginBottom: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="#4d4d4d" gutterBottom>Valor Global</Typography>
        </Grid>

        {/* TOKEN PRIMITIVO */}
        {categoriaToken !== 'Primitivo' &&
          <>
            <Grid item xs={12} md={3}>
              <LabelValues>
                <InputLabel id="select-primitivo-global-label">Token primitivo</InputLabel>
              </LabelValues>
            </Grid>
            <Grid item xs={12} md={9}>
              <CustomAutocomplete
                id="select-primitivo-global"
                name="tokenPrimitivoGlobal"
                options={optionPrimitivo}
                disabled={!isNil(tokenSemanticoGlobal)}
              />
            </Grid>
          </>
        }

        {/* TOKEN SEMÂNTICO */}
        {categoriaToken !== 'Primitivo' && categoriaToken !== 'Semântico' &&
          <>
            <Grid item xs={12} md={3}>
              <LabelValues>
                <InputLabel id="select-semantico-global-label">Token semântico</InputLabel>
              </LabelValues>
            </Grid>
            <Grid item xs={12} md={9}>
              <CustomAutocomplete
                id="select-semantico-global"
                name="tokenSemanticoGlobal"
                options={optionSemantico}
                disabled={!isNil(tokenPrimitivoGlobal)}
              />
            </Grid>
          </>
        }

        {/* VALOR */}
        <Grid item xs={12} md={3}>
          <LabelValues>
            <InputLabel id="input-value-global-label">Valor*</InputLabel>
          </LabelValues>
        </Grid>
        <Grid item xs={12} md={9}>
          <CustomTextField
            id="input-value-global"
            name="ValorTokenGlobal"
            required
            disabled={!isNil(tokenSemanticoGlobal) || !isNil(tokenPrimitivoGlobal)}
            helperText="O valor do token é obrigatório no nível Global"
          />
        </Grid>
      </Grid>
    </Paper>

  )
}

export default ValorGlobal


const LabelValues = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;