import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useConfigStore from '../../../config/stores/useConfigStore';

import {
  FetchRecordsComponents,
  FetchRecordsPrimitivos,
  FetchRecordsSemanticos,
} from '../../../config/utils/fetchTokens';

import {
  convertComponentsToOutput,
  convertPrimitivesToOutput,
  convertSemanticsToOutput,
  exportData,
} from '../../../config/utils/utils';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const ActionDownloadJson = ({ open, setOpen }) => {
  const [checkboxes, setCheckboxes] = useState({
    primitivos: false,
    semanticos: false,
    componentes: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = !Object.values(checkboxes).some(checked => checked);
  const url = useLocation().pathname.split('/');
  const isComponent = url?.[url.length - 2] === 'componentes';
  const urlComponent = url?.[url.length - 1];
  const componentNomeTratado = urlComponent?.[0]?.toLocaleUpperCase() + urlComponent?.slice(1);
  const designSystem = useConfigStore(state => state.designSystem);

  const handleCheckboxChange = event => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGerarJson = async () => {
    setIsLoading(true);
    try {
      const promises = [];
      const primitives = await FetchRecordsPrimitivos(designSystem).then(data => {
        return data;
      });

      if (checkboxes.primitivos) {
        const convertedPrimitivos = convertPrimitivesToOutput(primitives);
        exportData(convertedPrimitivos, 'primitives');
      }

      if (checkboxes.semanticos) {
        promises.push(
          FetchRecordsSemanticos(designSystem).then(data => {
            const convertedSemanticos = convertSemanticsToOutput(data);
            exportData(convertedSemanticos, 'semantic');
          })
        );
      }

      if (checkboxes.componentes) {
        promises.push(
          FetchRecordsComponents(componentNomeTratado, designSystem).then(data => {
            const convertedComponentes = convertComponentsToOutput(data);
            exportData(convertedComponentes, 'component');
          })
        );
      }

      await Promise.all(promises);
    } catch (error) {
      console.error('Erro ao gerar arquivos JSON:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isComponent) {
      setCheckboxes({
        ...checkboxes,
        componentes: false,
      });
    }
  }, [open]);

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 384, p: 2, pt: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" style={{ borderBottom: '1px solid #dedede', marginBottom: 20 }}>
          <Typography variant="h3" fontSize={18} color="#333333" fontWeight={600}>Exportar JSON</Typography>
          <IconButton onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography fontSize={13} color="#2d2c2c" variant="body1">
          Selecione abaixo os tokens que deseja exportar.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checkboxes.primitivos} size="small" onChange={handleCheckboxChange} name="primitivos" />}
              label="Primitivos"
            />
            <FormControlLabel
              control={<Checkbox checked={checkboxes.semanticos} size="small" onChange={handleCheckboxChange} name="semanticos" />}
              label="Semânticos"
            />
            {isComponent ? (
              <FormControlLabel
                control={
                  <Checkbox checked={checkboxes.componentes} size="small" onChange={handleCheckboxChange} name="componentes" />
                }
                label={<><span>{componentNomeTratado}</span><span style={{ fontSize: 11 }}> (componente)</span></>}
              />
            )
              :
              <Typography fontSize={12} color="#2d2c2c" variant="body1" style={{marginTop: 14}}>
                *Para exportar tokens de componente acesse a página do componente que deseja e clique em "Baixar JSON" 
              </Typography>
            }
          </FormGroup>
        </Box>
        <Button
          disabled={isButtonDisabled}
          variant="contained"
          onClick={handleGerarJson}
          size='small'
          sx={{ mt: 2, display: 'flex', ml: 'auto' }}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Baixar JSON'}
        </Button>
      </Box>
    </Drawer>
  );
};

export default ActionDownloadJson;
