import { useContext } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Context from './context';

const PreviewToken = () => {

  const { previewOpen, setPreviewOpen, watchAllFields } = useContext(Context);

  const handleClose = () => {
    setPreviewOpen(false);
  };

  const getSample = (tipo, value) => {
    switch (tipo) {
      case 'Color':
        return <SampleCor style={{ background: value }} />;
      case 'Font weight':
        return <p style={{ fontWeight: getWeight(value) }}>The quick brown fox</p>;
      case 'Font family':
        return <p style={{ fontFamily: `${value}` }}>The quick brown fox</p>;
      case 'Font size':
        return <p style={{ fontSize: value }}>The quick brown fox</p>;
      case 'Line height':
        return <p style={{ lineHeight: value, fontSize: 12 }}>The quick brown fox jumps over the lazy dog</p>;
      case 'Size':
        return <SampleSize style={{ width: value }} />;
      case 'Shadow':
        return <SampleShadow style={{ boxShadow: value }} />;
      case 'Border':
        if (value.length > 5) {
          return <SampleBoder style={{ border: value }} />;
        } else {
          return <SampleBoder style={{ borderWidth: value }} />;
        }
      case 'Border radius':
        return <SampleBoderRadius style={{ borderRadius: value }} />;
    }
  }


  return (

    <Dialog open={previewOpen} onClose={handleClose}>
      <DialogContent>
        <Typography variant="body1" color="#4d4d4d">
          <strong>{watchAllFields.NomeToken}</strong>
        </Typography>
        <WrapPreview>
          {watchAllFields.ValorTokenGlobal &&
            <Preview>
              <h3>Global</h3>
              {getSample(watchAllFields.tipo, watchAllFields.ValorTokenGlobal)}
              <span className='value'>valor: {watchAllFields.ValorTokenGlobal}</span>
            </Preview>
          }
          {watchAllFields.ValorTokenDS &&
            <Preview>
              <h3>DS</h3>
              {getSample(watchAllFields.tipo, watchAllFields.ValorTokenDS)}
              <span className='value'>valor: {watchAllFields.ValorTokenDS}</span>
            </Preview>
          }
        </WrapPreview>

        <Typography variant="body1" color="#4d4d4d" fontSize={12}>
          *Caso não esteja visualizando a prévia, verificar o campo "Tipo" no formulário, ou verifique se foi adicionado a unidade de medida no campo valor. (Exemplo: px)
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>

  )
}

export default PreviewToken


const WrapPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 540px;
  margin-bottom: 26px;
`;

const Preview = styled.div`
  flex-grow: 1;
  text-align: center;
  height: 160px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #c6c6c6;
  margin: 3px;
  padding-top: 8px;
  padding-bottom: 8px;
  position: relative;
  max-width: 200px;
  overflow: hidden;
  h3{
    position: absolute;
    top: 3px;
    padding: 0;
    left: 4px;
    margin: 0;
    font-size: 10px;
  }
  .value{
    position: absolute;
    bottom: 3px;
    padding: 0;
    left: 4px;
    margin: 0;
    font-size: 10px;
  }
  p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const SampleCor = styled.div`
  height: 80px;
  width: 80px;
  display: block;
  border-radius: 3px;
  margin: auto;
`;

const SampleSize = styled.div`
  height: 60px;
  display: block;
  margin: auto;
  background-color: rgb(25, 118, 210);
`;

const SampleBoder = styled.div`
  height: 60px;
  width: 60px;
  display: block;
  margin: auto;
  border-style: solid;
  border-color: rgb(25, 118, 210);
`;

const SampleBoderRadius = styled.div`
  height: 60px;
  width: 60px;
  display: block;
  margin: auto;
  border: 1px solid rgb(25, 118, 210)
`;

const SampleShadow = styled.div`
  height: 60px;
  width: 60px;
  display: block;
  margin: auto;
`;
