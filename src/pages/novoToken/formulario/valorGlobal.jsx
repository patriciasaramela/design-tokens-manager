import { useContext, useEffect, useState } from 'react';
// import styled from '@emotion/styled';
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
import CustomSelect from './customFields/CustomSelect';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: "#e1e1e1",
  //   color: "#333333",
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   // fontSize: 14,
  //   padding: 4
  // },
  '.designSystem': {
    backgroundColor: "#e1e1e1",
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));


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

  const Tipos = [
    { label: 'Color', value: 'Color' },
    { label: 'Border', value: 'Border' },
    { label: 'Border radius', value: 'Border radius' },
    { label: 'Font family', value: 'Font family' },
    { label: 'Font size', value: 'Font size' },
    { label: 'Font weight', value: 'Font weight' },
    { label: 'Line height', value: 'Line height' },
    { label: 'Shadow', value: 'Shadow' },
    { label: 'Size', value: 'Size' },
    { label: 'Z-index', value: 'Z-index' },
  ]

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

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Primitivo</StyledTableCell>
            <StyledTableCell>Semântico</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Usar no Bayon</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              <CustomTextField
                id="nomeToken"
                name="NomeToken"
                required
                // label="Nome do Token"
                placeholder='spds-gl-color-label'
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 150 }}>
              <CustomSelect
                id="select-tipo"
                name="tipo"
                required={false}
                // label="Tipo"
                options={Tipos}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-primitivo-global"
                name="tokenPrimitivoGlobal"
                options={optionPrimitivo}
                disabled={!isNil(tokenSemanticoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-semantico-global"
                name="tokenSemanticoGlobal"
                options={optionSemantico}
                disabled={!isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 180 }}>
              <CustomTextField
                id="input-value-global"
                name="ValorTokenGlobal"
                required
                disabled={!isNil(tokenSemanticoGlobal) || !isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>...</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow style={{borderTop: "2px solid #FFF"}}>
            <StyledTableCell component="th" scope="row">
              <CustomTextField
                id="nomeToken"
                name="NomeToken"
                required
                // label="Nome do Token"
                placeholder='spds-gl-color-label'
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 150 }}>
              <CustomSelect
                id="select-tipo"
                name="tipo"
                required={false}
                // label="Tipo"
                options={Tipos}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-primitivo-global"
                name="tokenPrimitivoGlobal"
                options={optionPrimitivo}
                disabled={!isNil(tokenSemanticoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-semantico-global"
                name="tokenSemanticoGlobal"
                options={optionSemantico}
                disabled={!isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 180 }}>
              <CustomTextField
                id="input-value-global"
                name="ValorTokenGlobal"
                required
                disabled={!isNil(tokenSemanticoGlobal) || !isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>...</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              <CustomTextField
                id="nomeToken"
                name="NomeToken"
                required
                // label="Nome do Token"
                placeholder='spds-gl-color-label'
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 150 }}>
              <CustomSelect
                id="select-tipo"
                name="tipo"
                required={false}
                // label="Tipo"
                options={Tipos}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-primitivo-global"
                name="tokenPrimitivoGlobal"
                options={optionPrimitivo}
                disabled={!isNil(tokenSemanticoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomAutocomplete
                id="select-semantico-global"
                name="tokenSemanticoGlobal"
                options={optionSemantico}
                disabled={!isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell style={{ width: 180 }}>
              <CustomTextField
                id="input-value-global"
                name="ValorTokenGlobal"
                required
                disabled={!isNil(tokenSemanticoGlobal) || !isNil(tokenPrimitivoGlobal)}
              />
            </StyledTableCell>
            <StyledTableCell>...</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>

    // <Paper style={{ padding: '12px 14px', marginBottom: 20 }}>
    //   <Grid container spacing={1}>
    //     <Grid item xs={12}>
    //       <Typography variant="h6" color="#4d4d4d" gutterBottom>Valor Global</Typography>
    //     </Grid>

    //     {/* TOKEN PRIMITIVO */}
    //     {categoriaToken !== 'Primitivo' &&
    //       <>
    //         <Grid item xs={12} md={3}>
    //           <LabelValues>
    //             <InputLabel id="select-primitivo-global-label">Token primitivo</InputLabel>
    //           </LabelValues>
    //         </Grid>
    //         <Grid item xs={12} md={9}>
    //           <CustomAutocomplete
    //             id="select-primitivo-global"
    //             name="tokenPrimitivoGlobal"
    //             options={optionPrimitivo}
    //             disabled={!isNil(tokenSemanticoGlobal)}
    //           />
    //         </Grid>
    //       </>
    //     }

    //     {/* TOKEN SEMÂNTICO */}
    //     {categoriaToken !== 'Primitivo' && categoriaToken !== 'Semântico' &&
    //       <>
    //         <Grid item xs={12} md={3}>
    //           <LabelValues>
    //             <InputLabel id="select-semantico-global-label">Token semântico</InputLabel>
    //           </LabelValues>
    //         </Grid>
    //         <Grid item xs={12} md={9}>
    //           <CustomAutocomplete
    //             id="select-semantico-global"
    //             name="tokenSemanticoGlobal"
    //             options={optionSemantico}
    //             disabled={!isNil(tokenPrimitivoGlobal)}
    //           />
    //         </Grid>
    //       </>
    //     }

    //     {/* VALOR */}
    //     <Grid item xs={12} md={3}>
    //       <LabelValues>
    //         <InputLabel id="input-value-global-label">Valor*</InputLabel>
    //       </LabelValues>
    //     </Grid>
    //     <Grid item xs={12} md={9}>
    //       <CustomTextField
    //         id="input-value-global"
    //         name="ValorTokenGlobal"
    //         required
    //         disabled={!isNil(tokenSemanticoGlobal) || !isNil(tokenPrimitivoGlobal)}
    //         helperText="O valor do token é obrigatório no nível Global"
    //       />
    //     </Grid>
    //   </Grid>
    // </Paper>

  )
}

export default ValorGlobal


// const LabelValues = styled.div`
//     height: 100%;
//     display: flex;
//     align-items: center;
// `;