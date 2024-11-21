import styled from '@emotion/styled';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useConfigStore from '../config/stores/useConfigStore';
import Component from './component';
import Header from './header/index';
import Home from './home';
import Novo from './novoToken';
import Primitives from './primitives';
import Semantic from './semantic';
import Sidebar from './sidebar/index';

const Painel = () => {
  const baseUrl = useConfigStore(state => state.baseUrl);

  return (
    <PainelWrapper>
      <BrowserRouter>
        <Sidebar />
        <ContainerWrapper>
          <Content>
            <Header />
            <Routes>
              <Route path={baseUrl} element={<Navigate to={`${baseUrl}/home`} replace />} />
              <Route path="*" element={<Navigate to={baseUrl} replace />} />
              <Route path={`${baseUrl}/home`} element={<Home />} />
              <Route path={`${baseUrl}/primitivos`} element={<Primitives />} />
              <Route path={`${baseUrl}/semanticos`} element={<Semantic />} />
              <Route path={`${baseUrl}/componentes/:componentName`} element={<Component />} />
              <Route path={`${baseUrl}/novo`} element={<Novo />} />
            </Routes>
          </Content>
        </ContainerWrapper>
      </BrowserRouter>
    </PainelWrapper>
  );
};

export default Painel;

const PainelWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
`;

const ContainerWrapper = styled.div`
  background: #181a28;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  background-color: #f1f1f1;
  width: 99%;
  height: 99%;
  border-radius: 30px;
  margin: 0.5% auto;
  overflow: hidden;
  padding: 14px 14px;
  box-sizing: border-box;
`;
