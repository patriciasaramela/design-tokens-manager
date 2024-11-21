import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import softplan from '../../assets/logo.png';
import useConfigStore from '../../config/stores/useConfigStore';
import useTokensStore from '../../config/stores/useTokensStore';
import { FetchComponentsNames } from '../../config/utils/fetchTokens';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Sidebar() {
  const [checked, setChecked] = useState(false);
  const baseUrl = useConfigStore.getState().baseUrl;
  const url = useLocation().pathname.split('/');
  const rotaAtual = url[url.length - 1];
  const isComponent = url[url.length - 2] === 'componentes';
  const designSystem = useConfigStore(state => state.designSystem);
  const setComponentList = useTokensStore(state => state.setComponentList);
  const componentList = useTokensStore(state => state.componentList);

  const { data, isLoading, isError } = useQuery({
    queryKey: [designSystem + 'componentsNames'],
    queryFn: () => FetchComponentsNames(designSystem),
    retry: 1,
    enabled: checked,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setComponentList(data);
  }, [data]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    setComponentList(null);
  }, [isError]);

  useEffect(() => {
    if (isComponent) {
      setChecked(true);
    }
  }, []);

  return (
    <>
      <SidebarAside>
        <Link to={`${baseUrl}/home`} relative="path">
          <LogoImage>
            <img src={softplan} alt="Logo Softplan" style={{ maxWidth: '98%' }} />
          </LogoImage>
        </Link>
        <SidebarNav>
          <ul>
            <li>
              <Link to={`${baseUrl}/home`} relative="path">
                <SidebarOption active={rotaAtual === 'home'}>Home</SidebarOption>
              </Link>
            </li>
            <li>
              <Link to={`${baseUrl}/primitivos`} relative="path">
                <SidebarOption active={rotaAtual === 'primitivos'}>Primitivos</SidebarOption>
              </Link>
            </li>
            <li>
              <Link to={`${baseUrl}/semanticos`} relative="path">
                <SidebarOption active={rotaAtual === 'semanticos'}>Semântico</SidebarOption>
              </Link>
            </li>
            <li>
              <SidebarOption onClick={() => setChecked(!checked)}>
                Componentes
                <div>
                  {checked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
              </SidebarOption>
              <Collapse in={checked}>
                <Scroll className="scroll">
                  {isLoading ? (
                    <LoaderWrapper>
                      <CircularProgress color="inherit" size={24} />
                    </LoaderWrapper>
                  ) : (
                    <ul style={{ marginLeft: 10 }}>
                      {componentList?.map(component => {
                        return (
                          <li key={component}>
                            <Link to={`${baseUrl}/componentes/${component}`} relative="path">
                              <SidebarOption active={rotaAtual === component}>{component}</SidebarOption>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Scroll>
              </Collapse>
            </li>
          </ul>
        </SidebarNav>
      </SidebarAside>
    </>
  );
}

const SidebarAside = styled.aside`
  height: 100vh;
  padding: 6% 10px;
  box-sizing: border-box;
  width: 230px;
  background-color: #181a28;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  a {
    text-decoration: none;
  }
`;

const LogoImage = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SidebarNav = styled.nav`
  width: 100%;
  ul {
    list-style: none;
    margin: 8px 0;
    padding: 0;
  }
`;

const SidebarOption = styled.button`
  width: 100%;
  height: 30px;
  background: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  color: ${props => (props.active ? 'rgb(92, 92, 255)' : 'white')};
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-size: 14px;
  text-transform: capitalize;
  &:hover {
    opacity: 0.7;
  }
`;

const Scroll = styled.div`
  height: calc(100vh - 280px);
  overflow-x: auto;
`;


const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

