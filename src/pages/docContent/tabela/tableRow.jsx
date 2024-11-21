import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { isNil } from 'ramda';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function TabelaToken(props) {
  const { dataToken } = props;

  const [showContent, setShowContent] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const getWeight = tipo => {
    switch (tipo) {
      case 'Light':
        return 300;
      case 'Regular':
        return 400;
      case 'Medium':
        return 500;
      case 'Semibold':
        return 600;
      case 'Bold':
        return 700;
      case 'Back':
        return 900;
    }
  };

  const getTokenList = (tipo, valor, pathToken, git) => {
    return (
      <TokenList>
        <li style={{ height: 24, display: 'flex', alignItems: 'center' }}>
          {tipo === 'Color' ? (
            <Stack direction="row" style={{ maxWidth: 110 }}>
              {valor && <SampleCorGlobal style={{ background: valor }} />}
              <Typography variant="body2" color="#4d4d4d" fontSize={13}>
                {valor}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body2" color="#4d4d4d" fontSize={13}>
              {valor}
            </Typography>
          )}
          {(!git) &&
            <Tooltip title="Não atualizado no git">
              <Git><AutoAwesomeIcon fontSize="12px" /></Git>
            </Tooltip>
          }
        </li>
        {!isNil(pathToken) &&
          showContent &&
          pathToken.map((path, index) => (
            <li key={path} className={index === (pathToken.length - 1) && 'usedToken'}>
              <Typography variant="body2" color="#4d4d4d" fontSize={12}>
                {path}
              </Typography>
            </li>
          ))}
      </TokenList>
    )
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
  };

  const copyToken = (tokenName) => {
    navigator.clipboard.writeText(tokenName)

    setCopied(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  // Global
  const pathTokenGlobal = dataToken['[Global] Path']?.split(',').filter(String);
  const valorGlobal = dataToken['[Global] Valor'];
  const gitGlobal = dataToken['[Global] Git'];

  // DS
  const pathTokenDS = dataToken['[Bayon] Path']?.split(',').filter(String);
  const valorDS = dataToken['[Bayon] Valor'];
  const gitDS = dataToken['[Bayon] Git'];

  //Sample
  const valorSample = dataToken['[Bayon] Valor'] ? dataToken['[Bayon] Valor'] : dataToken['[Global] Valor'];


  return (
    <TableRow>
      <TableCell align="center" style={{ verticalAlign: 'top' }} >
        {dataToken["Type"] !== 'Color' && getSample(dataToken["Type"], valorSample)}
      </TableCell>
      <TableCell align="right" style={{ verticalAlign: 'top' }} >
        {(dataToken['Novo'] === 1) &&
          <Tooltip title={`Adicionado em ${format(new Date(dataToken['Created']), 'dd/MM/yyyy')}`}>
            <Novo><FiberNewIcon fontSize="small" /></Novo>
          </Tooltip>
        }
      </TableCell>
      <TableCell component="th" scope="row" style={{ verticalAlign: 'top' }} >
        <TokenName>
          <Typography variant="body2" color="#4d4d4d">
            {dataToken['Name']}
          </Typography>
          <Tooltip title={isCopied ? "Copiado" : "Copiar"}>
            <IconButton size="small" className='copyButton' onClick={() => copyToken(dataToken['Name'])} style={{ marginLeft: 6 }}>
              {isCopied ?
                <CheckIcon fontSize="12px" />
                :
                <ContentCopyIcon fontSize="12px" />
              }
            </IconButton>
          </Tooltip>
        </TokenName>
        {dataToken && showContent && (
          <Typography variant="body2" color="#4d4d4d" fontSize={12} style={{ marginTop: 8 }}>
            {dataToken['Description']}
          </Typography>
        )}
      </TableCell>
      {!props.isGLobal &&
        <TableCell style={{ verticalAlign: 'top' }} >
          {getTokenList(dataToken["Type"], valorDS, pathTokenDS, gitDS)}
        </TableCell>
      }
      <TableCell style={{ verticalAlign: 'top' }} >
        {getTokenList(dataToken["Type"], valorGlobal, pathTokenGlobal, gitGlobal)}
      </TableCell>

      <TableCell style={{ verticalAlign: 'top' }} >
        <Stack direction="row">

          <IconButton aria-label="delete" size="small" onClick={() => setShowContent(!showContent)}>
            {showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {/* <Tooltip title="Editar">
            <IconButton aria-label="delete" size="small">
              <ModeOutlinedIcon />
            </IconButton>
          </Tooltip> */}
        </Stack>
      </TableCell>
    </TableRow >
  );
}

export default TabelaToken;

const TokenList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    &:not(:first-child) {
      position: relative;
      padding-top: 14px;
      &::before {
        content: '↑';
        display: block;
        position: absolute;
        left: 6px;
        top: -4px;
      }
    }
    &.usedToken p{
        background: #eaeaea;
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        margin: 3px 0;
      }
    }
`;

const SampleCor = styled.div`
  height: 26px;
  width: 100px;
  display: block;
  border-radius: 3px;
  margin: auto;
`;

const SampleCorGlobal = styled.div`
  height: 18px;
  width: 18px;
  display: block;
  border-radius: 50%;
  margin-right: 10px;
`;

const SampleSize = styled.div`
  height: 26px;
  display: block;
  margin: auto;
  background-color: rgb(25, 118, 210);
`;

const SampleBoder = styled.div`
  height: 26px;
  width: 26px;
  display: block;
  margin: auto;
  border-style: solid;
  border-color: rgb(25, 118, 210);
`;

const SampleBoderRadius = styled.div`
  height: 26px;
  width: 26px;
  display: block;
  margin: auto;
  border: 1px solid rgb(25, 118, 210);
`;

const SampleShadow = styled.div`
  height: 26px;
  width: 26px;
  display: block;
  margin: auto;
`;

const TokenName = styled.div`
  display: flex;
  align-items: center;
  .copyButton{
    opacity: 0;
  }
  &:hover{
    .copyButton{
      opacity: 1;
    }
  }
`;

const Novo = styled.div`
  margin-left: 2px;
  align-items: center;
  display: flex;
  svg{
    fill: #1976d2;
  }
`;

const Git = styled.div`
  margin-left: 2px;
  margin-top: 4px;
  svg{
    fill: #eba30e;
  }
`;