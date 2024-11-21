import { create } from 'zustand';
import { cleanData, removeBlankSpaces, transformData } from '../../config/utils/utils';

const useTokensStore = create(set => ({
  isLoading: false,

  primitiveTokens: null,
  primitiveData: null,
  datePrimitive: null,

  semanticTokens: null,
  semanticData: null,
  dateSemantic: null,

  componentTokens: null,
  componentData: null,
  dateComponent: null,

  componentList : [],

  setLoading: () => {
    set({ isLoading: true });
  },

  setBaseTokens: dataTokens => {
    set(() => {
      return {
        primitiveData: dataTokens,
        isLoading: false,
        datePrimitive: Date.now(),
        dateSemantic: Date.now(),
      };
    });
  },

  setSemanticTokens: dataTokens => {
    set(() => {
      return {
        semanticData: dataTokens,
      };
    });
  },

  setComponentTokens: dataTokens => {
    set(() => {
      const dadosComVariaveis = cleanData(dataTokens);
      const dadosAgrupadosPrimitivos = transformData(dadosComVariaveis, 'componente');
      const dadosHigienizadosPrimitivos = removeBlankSpaces(dadosAgrupadosPrimitivos);

      return {
        componentTokens: dadosHigienizadosPrimitivos,
        componentData: dataTokens,
        isLoading: false,
        dateComponent: Date.now(),
      };
    });
  },

  setComponentList: componentListName => {
    set({ componentList: componentListName });
  },

}));

export default useTokensStore;