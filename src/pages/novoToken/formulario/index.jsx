import { useState, useContext } from 'react';
import styled from '@emotion/styled';
import Context from '../context';
import DadosToken from './dadosToken';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ValorGlobal from './valorGlobal';
import ValorDS from './valorDS';
import { isEmpty, isNil } from 'ramda';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PreviewToken from '../preview';

const Formulario = () => {
  const { watchAllFields, handleSubmit, salvaDadosToken, categoriaToken, snackbarMessage, setSnackbar, setPreviewOpen } = useContext(Context);
  const onSubmit = (data) => salvaDadosToken(data);

  //ToDo: Tornar campo "Tipo" obrigatório

  return (
    <>
      <Scroll className='scroll'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DadosToken />
          {!isNil(categoriaToken) &&
            <Grid container spacing={2}>
              <Grid item xs={12} 
              //md={6}
              >
                <ValorGlobal />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <ValorDS />
              </Grid> */}
            </Grid>
          }
          <Paper style={{ padding: '12px 14px', marginBottom: 20 }}>
            <FooterButton>
              <Button>Limpar</Button>
              <Button disabled={isNil(watchAllFields.tipo)} onClick={() => setPreviewOpen(true)}>Testar token</Button>
              <Button type="submit" variant='contained'>Salvar</Button>
            </FooterButton>
          </Paper>

          <PreviewToken />
        </form>
      </Scroll>
      <Snackbar open={!isEmpty(snackbarMessage)} autoHideDuration={3000} onClose={() => setSnackbar('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={() => setSnackbar('')}
          sx={{ width: '100%' }}
          severity={snackbarMessage}
        >
          {snackbarMessage === "success" ?
            "Token atualizado com sucesso"
            :
            "Houve um problema ao adicionar o Token"
          }
        </Alert>
      </Snackbar>

    </>
  )
}

export default Formulario;

const FooterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
`;

const Scroll = styled.div`
  height: calc(100vh - 110px);
  overflow-x: auto;
  padding: 5px;
`;