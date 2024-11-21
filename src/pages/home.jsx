import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Taxonomia from '../assets/taxonomia.png'
import Categoria from '../assets/categoria.png'
import Cadastro from '../assets/cadastro.png'
import Grid from '@mui/material/Grid';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Home = () => {

  return (
    <ComponentList>
      <Scroll className="scroll">
        <Typography variant="h2" fontSize={34} color="#333333" fontWeight={600} gutterBottom>
          O que são Design tokens?
        </Typography>

        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          Os design tokens são usados como uma forma de auxiliar designers e desenvolvedores a usarem uma linguagem em comum
          para se referir a valores essenciais e reutilizáveis, visando garantir consistência no desenvolvimento de UI.
        </Typography>
        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          No lugar de usar valores brutos (como valores hexadecimais para cores ou valores de pixels para espaçamento por exemplo),
          são usados os tokens, que funcionam como "variáveis", que tem um nome e um valor atrelado a ela.
        </Typography>
        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          Por exemplo, em vez de escolher um dos muitos tons de vermelho para um ícone de erro,
          podemos usar um design token que seja consistente com todos os usos semelhantes no produto.
        </Typography>

        <Typography variant="h2" fontSize={34} color="#333333" fontWeight={600} gutterBottom style={{ marginTop: 30 }}>
          Categorização
        </Typography>


        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="#4d4d4d" gutterBottom>
              Os tokens são separados em 3 categorias:<br />
            </Typography>
            <Typography variant="body1" color="#4d4d4d" gutterBottom>
              <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>
                ⦁ Primitivo:&nbsp;
              </Typography>
              tokens com os valores brutos, que referenciam os valores brutos. Normalmente possui nomes genéricos.
            </Typography>
            <Typography variant="body1" color="#4d4d4d" gutterBottom>
              <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>
                ⦁ Semântico:&nbsp;
              </Typography>
              tokens com nomes que possuem mais semântica em relação ao seu uso, costumam referenciar tokens do nível primitivo.
            </Typography>
            <Typography variant="body1" color="#4d4d4d" gutterBottom>
              <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>
                ⦁ Componente:&nbsp;
              </Typography>
              tokens com nomenclatura que represente sua função e componente ou grupo que será aplicado. Costumam referenciar tokens semânticos, ou primários.
            </Typography>
            <Typography variant="body1" color="#4d4d4d" gutterBottom style={{ marginTop: 20 }}>
              Dessa forma fica mais fácil fazer alguma alteração. Se for necessário alterar a cor do label
              dos formulários basta alterar o valor no nível primitivo, ou semântico e será replicado em todos os lugares que usam o token.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={Categoria} alt="Logo Softplan" style={{ maxWidth: '340px', width: '100%', margin: '20px auto' }} />
          </Grid>
        </Grid>
        <Typography variant="h2" fontSize={34} color="#333333" fontWeight={600} gutterBottom style={{ marginTop: 30 }}>
          Nomenclatura de Design tokens
        </Typography>
        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          Saber ler nomes de tokens auxilia a encontrar o token certo mais rapidamente ao trabalhar em designs e códigos.
        </Typography>
        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          A nomeação dos tokens deve ser feita de forma semântica, para que quem vá usar saiba o proposito do token somente lendo seu nome.
          Para isso usamos a seguinte estrutura:
        </Typography>

        <img src={Taxonomia} alt="Logo Softplan" style={{ maxWidth: 840, width: '100%', margin: '20px auto' }} />

        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          Para auxiliar na criação dos tokens você pode usar a&nbsp;
          <a href='https://docs.google.com/spreadsheets/d/1I27BlzBMliQqMf9_uQkjP6DTfaOc9NiMgE1siKkLLvg/edit?gid=419426458#gid=419426458'>planilha de taxonomia de tokens</a>,
          que segue a estrutura ilustrada acima para criar os tokens.
        </Typography>


        <Typography variant="h2" fontSize={34} color="#333333" fontWeight={600} gutterBottom style={{ marginTop: 30 }}>
          Como gerenciar os tokens?
        </Typography>

        <Typography variant="body1" color="#4d4d4d" gutterBottom>
          Essa página deve ser usada para consultar, cadastrar e baixar o arquivos JSON referente aos tokens.<br />
          Para que um token fique disponível para uso no desenvolvimento é necessário que ele seja adicionado nesse sistema.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={Cadastro} alt="Logo Softplan" style={{ maxWidth: 730, width: '100%', margin: '40px auto 20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ul style={{ marginTop: 30 }}>
              <li>
                <Typography variant="body1" color="#4d4d4d" gutterBottom>
                  ⦁ Para disponibilizar um token para uso o primeiro passo é <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>fazer o cadastro</Typography>, clicando no botão "novo token".
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="#4d4d4d" gutterBottom>
                  ⦁ Ao cadastrar você pode <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>testar</Typography> para ver se o token irá funcionar corretamente. Para isso , o campo "Tipo de componente"
                  deve estar preenchido.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="#4d4d4d" gutterBottom>
                  ⦁ Após o cadastro o token será disponibilizado na documentação e sinalizado
                  como <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>novo</Typography>.
                </Typography>
              </li>
              {/* <li>
                <Typography variant="body1" color="#4d4d4d" gutterBottom>
                  ⦁ O sistema automatiza a transformação de tokens em JSON para que sejam usados no design system.
                </Typography>
              </li> */}
              <li>
                <Typography variant="body1" color="#4d4d4d" gutterBottom>
                  ⦁ Os tokens só estarão disponíveis para uso dos devs quando forem <Typography variant="body1" color="#4d4d4d" fontWeight="bold" style={{ display: 'inline-block' }}>disponibilizados no git</Typography>.<br />
                  Tokens e valores que ainda não estão refletindo os valores dessa página estarão sinalizados com o ícone <AutoAwesomeIcon fontSize="12px" style={{ fill: '#eba30e' }} />.
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Scroll>
    </ComponentList >
  )
}

export default Home

const ComponentList = styled.div`
  padding: 10px;
  height: 100%;
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
`;

const Scroll = styled.div`
  height: calc(100vh - 140px);
  overflow-x: auto;
  padding-right: 14px;
  scroll-behavior: smooth;
`;
