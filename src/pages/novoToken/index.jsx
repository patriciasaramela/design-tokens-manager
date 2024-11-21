
import { NovoTokenProvider } from '../novoToken/context';
import Formulario from './formulario/index';

const Novo = () => {

  return (
    <NovoTokenProvider>
      <Formulario />
    </NovoTokenProvider>
  )
}

export default Novo
