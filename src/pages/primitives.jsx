import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useConfigStore from '../config/stores/useConfigStore';
import useTokensStore from '../config/stores/useTokensStore';
import { FetchRecordsPrimitivos } from '../config/utils/fetchTokens';
import DocContent from './docContent';

const Primitives = () => {
  const setBaseTokens = useTokensStore(state => state.setBaseTokens);
  const primitiveData = useTokensStore(state => state.primitiveData);
  const designSystem = useConfigStore(state => state.designSystem);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['primitivos', designSystem],
    queryFn: () => FetchRecordsPrimitivos(designSystem),
    retry: 1,
  });


  useEffect(() => {
    if (!data) {
      return;
    }

    setBaseTokens(data);
  }, [data]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    setBaseTokens(null);
  }, [isError]);

  return (
    <DocContent listaTokens={primitiveData} isLoading={isLoading} />
  );
};

export default Primitives;
