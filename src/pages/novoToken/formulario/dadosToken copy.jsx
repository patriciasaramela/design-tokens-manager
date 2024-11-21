import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import CustomSelect from './customFields/CustomSelect';
import Context from '../context';
import CustomTextField from './customFields/CustomTextField';
import CustomCreatable from './customFields/CustomCreatable';
import useTokensStore from '../../../config/stores/useTokensStore';

const DadosToken = () => {
  const { categoriaToken } = useContext(Context);
  const componentList = useTokensStore(state => state.componentList);

  const componentes =  componentList.map(function(componentName){
    return {
      label: componentName, value: componentName
    }
  });

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


  return (
    <Paper style={{ padding: '12px 14px', marginBottom: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" color="#4d4d4d">Informações do token</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelect
            id="select-categoria"
            name="Categoria"
            required
            label="Categoria *"
            options={
              [
                { label: 'Primitivo', value: 'Primitivo' },
                { label: 'Semântico', value: 'Semântico' },
                { label: 'Componente', value: 'Componente' }
              ]
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {categoriaToken === 'Componente' &&
            <CustomCreatable
            id="select-categoria"
            name="Componente"
            required
            label="Componente *"
            options={componentes}
          />
          }
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="nomeToken"
            name="NomeToken"
            required
            label="Nome do Token"
            placeholder='spds-gl-color-label'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelect
            id="select-tipo"
            name="tipo"
            required={false}
            label="Tipo"
            options={Tipos}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomTextField
            id="descricao"
            name="descricao"
            label="Descrição"
            multiline
          />
        </Grid>
      </Grid>
    </Paper>

  )
}

export default DadosToken
