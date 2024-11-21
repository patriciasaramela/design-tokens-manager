import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useConfigStore from '../../config/stores/useConfigStore';
import { FetchConfig } from '../../config/utils/fetchConfig';
import ActionDownloadJson from '../actions/actionDownloadJson';

const Header = () => {
  const { baseUrl, setConfig, config } = useConfigStore();
  const { designSystem, setDesignSystem } = useConfigStore();
  const [openModalBaixar, setOpenModalBaixar] = useState(false);

  const url = useLocation().pathname.split('/');
  const rotaAtual = url[url.length - 1];

  const { data } = useQuery({
    queryKey: ['config'],
    queryFn: FetchConfig,
    retry: 2,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setConfig(data);
  }, [data]);

  const handleChange = event => {
    const newDs = {
      designSystem: event.target.value,
      logo: 'softplan.png',
      colorTheme: '#5C5CFF',
    };

    setDesignSystem(newDs);
  };

  return (
    <>
      <HeaderWrap>
        <div>
          {(rotaAtual !== 'home' && rotaAtual !== 'novo') &&
            < FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="ds-select-small-label">DS</InputLabel>
              <Select
                labelId="ds-select-small-label"
                id="ds-select-small"
                value={designSystem}
                label="Selecione o Design System"
                onChange={handleChange}
              >
                {config?.config.DS.map(ds => (
                  <MenuItem key={ds} value={ds}>
                    {ds}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
        </div>
        <div>
          {(rotaAtual !== 'home' && rotaAtual !== 'novo') &&
            <Button onClick={() => setOpenModalBaixar(true)} variant="contained" size="small" style={{ marginRight: 6 }}>
              Baixar Json
            </Button>
          }
          <Link to={`${baseUrl}/novo`} relative="path">
            <Button variant="contained" size="small" disabled>
              Novo token
            </Button>
          </Link>
        </div>
      </HeaderWrap >
      <ActionDownloadJson open={openModalBaixar} setOpen={setOpenModalBaixar} />
    </>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  min-height: 58px;
`;
