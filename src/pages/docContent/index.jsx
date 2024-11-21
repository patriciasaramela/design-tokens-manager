import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import Tabela from './tabela';
import TableOfContents from './tableOfContents';
import IconType from './iconType';
import useConfigStore from '../../config/stores/useConfigStore';

function DocContent(props) {
  const { listaTokens, isLoading } = props;
  const url = useLocation().pathname.split('/');
  const rotaAtual = url[url.length - 1];
  const { designSystem } = useConfigStore();

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    const array = Array.from(map, ([name, value]) => ({ name, value }));
    return array;
  }

  const grouped = listaTokens && groupBy(listaTokens, token => token.Type);

  const tituloPagina = {
    primitivos: 'Primitivos',
    semanticos: 'Semânticos',
    componentes: props.componentName ?? 'Componentes',
  };

  return (
    <Wrapper>
      {isLoading ?
        <LoaderWrap>
          <CircularProgress />
        </LoaderWrap>
        :
        <Grid container>
          <Grid item xs={12} md={10}>
            <Conteudo>
              <Titulo>
                <div>
                  <Typography variant="h4" color="#333333" fontWeight={600}>
                    {tituloPagina[rotaAtual] ?? tituloPagina['componentes']}
                  </Typography>
                  <Typography variant="body2" fontSize={12} color="#4d4d4d" gutterBottom>
                    ({listaTokens?.length} tokens)
                  </Typography>
                </div>
              </Titulo>
              <Scroll className="scroll">
                {grouped && grouped.length > 0 ? (
                  grouped.map(function (tokenItem) {
                    return (
                      <div key={tokenItem.name} style={{ marginBottom: 60 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                          <IconType size={26} type={tokenItem.name} style={{ marginRight: 8 }} />
                          <Typography
                            variant="h5"
                            color="#2d2c2c"
                            fontWeight={600}
                            id={tokenItem.name.replaceAll(' ', '-')}
                          >
                            {tokenItem.name}
                          </Typography>
                        </div>


                        <Tabela data={tokenItem} isGLobal={designSystem === 'Global'} />
                      </div>
                    );
                  })
                ) : (
                  <Typography variant="h5" color="#2d2c2c" fontWeight={600} gutterBottom>
                    Não há tokens com o design system selecionado.
                  </Typography>
                )}
              </Scroll>
            </Conteudo>
          </Grid>
          <Grid item xs={12} md={2}>
            <TableOfContents data={listaTokens} />
          </Grid>
        </Grid>
      }
    </Wrapper>
  );
}

export default DocContent;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 190px);
  position: relative;
`;

const Titulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Conteudo = styled.div`
  position: relative;
`;

const Scroll = styled.div`
  height: calc(100vh - 190px);
  overflow-x: auto;
  padding-right: 14px;
  scroll-behavior: smooth;
`;

const LoaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
`;
