"use client";

import Modal from "@/components/modal";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";

const ModalContext = createContext(null);

const ANIMATION_DURATION = 300;

const DEFAULT_MODAL_CONFIG = {
  position: "center",
  isOpen: true,
  props: {},
};

export const ModalProvider = ({ children }) => {
  const [activeModals, setActiveModals] = useState([]);

  const openModal = useCallback(
    (modalName, title, position = "center", props = {}) => {
      if (!modalName || typeof modalName !== "string") {
        console.error("Modal name is required and must be a string");
        return;
      }

      setActiveModals((prev) => [
        ...prev.filter((m) => m.name !== modalName),
        {
          ...DEFAULT_MODAL_CONFIG,
          name: modalName,
          title,
          position,
          props,
        },
      ]);
    },
    []
  );

  const closeModal = useCallback((modalName) => {
    if (!modalName) return;

    setActiveModals((prev) =>
      prev.map((modal) =>
        modal.name === modalName ? { ...modal, isOpen: false } : modal
      )
    );

    setTimeout(() => {
      setActiveModals((prev) => prev.filter((m) => m.name !== modalName));
    }, ANIMATION_DURATION);
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {activeModals.map((modal) => (
        <Modal key={modal.name} {...modal} />
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
