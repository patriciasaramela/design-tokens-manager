import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useConfigStore = create(
  persist(
    set => ({
      baseUrl: '/tokens',
      designSystem: 'Global',
      logo: 'softplan.png',
      colorTheme: '#5C5CFF',
      config: null,

      setDesignSystem: ds => {
        set({
          designSystem: ds.designSystem,
        });
      },

      setConfig: config => set({ config }),
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ designSystem: state.designSystem }),
    }
  )
);

export default useConfigStore;
