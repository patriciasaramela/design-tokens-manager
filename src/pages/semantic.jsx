import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useConfigStore from '../config/stores/useConfigStore';
import useTokensStore from '../config/stores/useTokensStore';
import { FetchRecordsSemanticos } from '../config/utils/fetchTokens';

import DocContent from './docContent';

const Semantics = () => {
  const setSemanticTokens = useTokensStore(state => state.setSemanticTokens);
  const semanticData = useTokensStore(state => state.semanticData);
  const designSystem = useConfigStore(state => state.designSystem);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['semanticos', designSystem],
    queryFn: () => FetchRecordsSemanticos(designSystem),
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
      <DocContent listaTokens={semanticData} isLoading={isLoading} />
    </>
  );
};

export default Semantics;
