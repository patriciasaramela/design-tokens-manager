import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useConfigStore from '../config/stores/useConfigStore';
import useTokensStore from '../config/stores/useTokensStore';
import { FetchRecordsComponents } from '../config/utils/fetchTokens';
import DocContent from './docContent';

const Semantics = () => {
  const setSemanticTokens = useTokensStore(state => state.setSemanticTokens);
  const semanticData = useTokensStore(state => state.semanticData);
  const { componentName } = useParams();
  const componenteNomeTratado = componentName?.[0]?.toLocaleUpperCase() + componentName?.slice(1);
  const designSystem = useConfigStore(state => state.designSystem);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['components', `${componenteNomeTratado + designSystem}`],
    queryFn: () => FetchRecordsComponents(componenteNomeTratado, designSystem),
    retry: 1,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setSemanticTokens(data);
  }, [data]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    setSemanticTokens(null);
  }, [isError]);

  return (
    <>
      <DocContent listaTokens={semanticData} isLoading={isLoading} componentName={componenteNomeTratado} />
    </>
  );
};

export default Semantics;
