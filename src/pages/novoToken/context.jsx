
import { createContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useTokensStore from '../../config/stores/useTokensStore';
import useConfigStore from '../../config/stores/useConfigStore';
import { CreateRecordToken } from '../../config/utils/fetchTokens';
import { useMutation } from '@tanstack/react-query';
import { isEmpty, isNil } from 'ramda';



export const Context = createContext();

export const NovoTokenProvider = ({ children }) => {
  const { config } = useConfigStore();
  const { watch, control, handleSubmit, reset, setValue, resetField } = useForm({});
  const primitiveData = useTokensStore(state => state.primitiveData);
  const semanticData = useTokensStore(state => state.semanticData);
  const [snackbarMessage, setSnackbar] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { designSystem } = useConfigStore();
  const [useGlobalValue, setUseGlobalValue] = useState(true);
  const allDesignSystems = config?.config.DS;

  let watchAllFields = watch();
  const categoriaToken = watch("Categoria");
  const tokenPrimitivoGlobal = watch("tokenPrimitivoGlobal");
  const tokenSemanticoGlobal = watch("tokenSemanticoGlobal");
  const tokenSemanticoDS = watch("tokenSemanticoDS");
  const tokenPrimitivoDS = watch("tokenPrimitivoDS");

  const mutationToken = useMutation({
    mutationFn: async ({ valor }) => {
      await CreateRecordToken(categoriaToken, valor);
    },
    onSuccess: () => {
      setSnackbar("success");
      //ToDo: Resetar informações de valor, nome do token e descrição
    },
    onError: error => {
      setSnackbar("error");
      console.error(error);
      refetch();
    },
  });

  console.log('watchAllFields', watchAllFields)

  const salvaDadosToken = async (formData) => {
    console.log('?', categoriaToken);
    let listaDS = useGlobalValue ? listaDS.filter((nomeDS) => nomeDS !== designSystem) : allDesignSystems;
    //ToDo: Ajustar o codigo abaixo.

    let newTokenValues;
    switch (categoriaToken) {
      case 'Primitivo':
        newTokenValues = {
          "Name": formData.NomeToken,
          "Type": formData.tipo,
          "Description": formData?.descricao,
        }
        listaDS.map(nomeDS => {
          newTokenValues[`[${nomeDS}] Valor`] = formData.ValorTokenGlobal;
        });
        if (!useGlobalValue) {
          newTokenValues[`[${designSystem}] Valor`] = formData?.ValorTokenDS;
        }
        break;
      case 'Semântico':
        newTokenValues = {
          "Name": formData.NomeToken,
          "Type": formData.tipo,
          "Description": formData?.descricao,
        }
        if (isNil(formData.tokenPrimitivoGlobal)) {
          listaDS.map(nomeDS => {
            newTokenValues[`[${nomeDS}] Valor manual (Semântico)`] = formData.ValorTokenGlobal;
          });
        } else {
          listaDS.map(nomeDS => {
            newTokenValues[`[${nomeDS}] Primitivo`] = [formData.tokenPrimitivoGlobal.id];
          });
        }
        if (!useGlobalValue) {
          newTokenValues[`[${designSystem}] Primitivo`] = [formData.tokenPrimitivoDS?.id];
          delete newTokenValues[`[${designSystem}] Valor manual (Semântico)`];
        } else if (!isEmpty(formData.ValorTokenDS)) {
          newTokenValues[`[${designSystem}] Valor manual (Semântico)`] = formData.ValorTokenDS;
          delete newTokenValues[`[${designSystem}] Primitivo`];
        }

        break;
      case 'Componente':
        newTokenValues = {
          "Name": formData.NomeToken,
          "Type": formData.tipo,
          "Componente": formData.Componente.label,
          "Description": formData?.descricao,
        }
        if (!isNil(tokenPrimitivoGlobal)) {
          listaDS.map(nomeDS => {
            newTokenValues[`[${nomeDS}] Primitivo`] = [formData.tokenPrimitivoGlobal.id]
          });
        } else if (!isNil(tokenSemanticoGlobal)) {
          listaDS.map(nomeDS => {
            newTokenValues[`[${nomeDS}] Semântico`] = [formData.tokenSemanticoGlobal.id];
            newTokenValues[`[${nomeDS}] Primitivo`] = [formData.tokenSemanticoGlobal.primitivo];
          });
        } else {
          listaDS.map(nomeDS => {
            newTokenValues[`[${nomeDS}] Valor manual (Componente)`] = formData.ValorTokenGlobal;
          });
        }

        if (!useGlobalValue) {
          if (!isNil(tokenPrimitivoDS)) {
            newTokenValues[`[${designSystem}] Primitivo`] = [formData.tokenPrimitivoDS?.id];
            delete newTokenValues[`[${designSystem}] Semântico`];
            delete newTokenValues[`[${designSystem}] Valor manual (Semântico)`];
          } else if (!isNil(tokenSemanticoDS)) {
            newTokenValues[`[${designSystem}] Semântico`] = [formData.tokenSemanticoDS?.id];
            newTokenValues[`[${designSystem}] Primitivo`] = [formData.tokenSemanticoDS?.primitivo];
            delete newTokenValues[`[${designSystem}] Valor manual (Semântico)`];
          } else {
            newTokenValues[`[${designSystem}] Valor manual (Componente)`] = formData.ValorTokenDS;
            delete newTokenValues[`[${designSystem}] Primitivo`];
            delete newTokenValues[`[${designSystem}] Semântico`];
          }
        }


        break;

      default:
        break;
    }
    console.log('newTokenValues', newTokenValues)
    // mutationToken.mutate({ valor: newTokenValues });
  };


  //Validação do valor selecionado no select de token  global
  useEffect(() => {
    if (!isNil(tokenSemanticoGlobal)) {
      setValue("ValorTokenGlobal", tokenSemanticoGlobal.value);
    } else if (!isNil(tokenPrimitivoGlobal)) {
      setValue("ValorTokenGlobal", tokenPrimitivoGlobal.value);
    } else {
      setValue("ValorTokenGlobal", "");
    }
  }, [tokenPrimitivoGlobal, tokenSemanticoGlobal]);


  //Validação do valor selecionado no select de token DS
  useEffect(() => {
    if (!isNil(tokenSemanticoDS)) {
      setValue("ValorTokenDS", tokenSemanticoDS.value);
    } else if (!isNil(tokenPrimitivoDS)) {
      setValue("ValorTokenDS", tokenPrimitivoDS.value);
    } else {
      setValue("ValorTokenDS", "");
    }
  }, [tokenPrimitivoDS, tokenSemanticoDS]);


  //ToDo: Puxar os dados de primitivo, semântico e nome de componente de acordo com o que é selecionada no select de "categoria"


  const values = {
    watchAllFields,
    control,
    handleSubmit,
    categoriaToken,
    salvaDadosToken,
    tokenPrimitivoGlobal,
    tokenSemanticoGlobal,
    tokenPrimitivoDS,
    tokenSemanticoDS,
    snackbarMessage,
    setSnackbar,
    previewOpen,
    setPreviewOpen,
    primitiveData,
    semanticData,
    useGlobalValue,
    setUseGlobalValue
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default Context;
