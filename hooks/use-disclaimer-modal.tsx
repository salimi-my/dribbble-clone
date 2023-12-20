import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useDisclaimerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDisclaimerModal = create(
  persist<useDisclaimerModalStore>(
    (set) => ({
      isOpen: true,
      onOpen: () => {
        set({ isOpen: true });
      },
      onClose: () => {
        set({ isOpen: false });
      }
    }),
    {
      name: 'disclaimerModal',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useDisclaimerModal;
