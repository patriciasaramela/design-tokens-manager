import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import TabelaToken from './tableRow';

function Tabela(props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: 170 }}>
              Sample
            </TableCell>
            <TableCell style={{ width: 30 }}></TableCell>
            <TableCell style={{ width: 260 }}>Token</TableCell>
            <TableCell style={{ width: 170 }}>Valor</TableCell>
            {!props.isGLobal &&
              <TableCell style={{ width: 170 }}>Global</TableCell>
            }
            <TableCell style={{ width: 40 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.value.map((elementToken, index) => {
            return <TabelaToken key={index} dataToken={elementToken} isGLobal={props.isGLobal} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tabela;
