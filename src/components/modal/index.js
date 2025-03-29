import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/contexts/modal-context";
import { useEffect, memo } from "react";
import { modals } from "./modals";
import Icon from "../icon";
import { useSettings } from "@/contexts/settings-context";

const POSITIONS = {
  center: "items-center justify-center",
  bottom: "items-end justify-center",
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
  top: "items-start justify-center",
};

const MODAL_ANIMATIONS = {
  left: {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
  right: {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
  bottom: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
  default: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
};

const getModalStyles = (position) => {
  const baseStyles =
    "relative border border-black/20 dark:border-white/15 border-dashed bg-white/80 dark:bg-black/80 backdrop-blur-md w-auto flex flex-col max-h-[90vh]";

  return position === "left" || position === "right"
    ? `${baseStyles} h-screen max-h-screen`
    : position === "screen"
    ? `${baseStyles} w-screen h-screen max-h-screen border-none`
    : position === "bottom"
    ? `${baseStyles} bottom-8 rounded-md`
    : `${baseStyles} rounded-md`;
};

const Modal = memo(({ name, title, position = "center", props, isOpen }) => {
  const { closeModal } = useModal();
  const modalConfig = modals.find((m) => m.name === name);
  const Component = modalConfig?.component;
  const { lang } = useSettings();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal(name);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [name, closeModal]);

  if (!Component) {
    console.error(`Modal not found: ${name}`);
    return null;
  }

  const animation = MODAL_ANIMATIONS[position] || MODAL_ANIMATIONS.default;
  const contentClassName =
    position === "left" || position === "right"
      ? "flex-1 overflow-y-auto"
      : position === "screen"
      ? "flex-1 overflow-y-auto"
      : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-[100000] flex ${POSITIONS[position]}`}
          onClick={() => closeModal(name)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className={getModalStyles(position)}
            onClick={(e) => e.stopPropagation()}
            {...animation}
          >
            <div className={contentClassName}>
              <Component
                close={() => closeModal(name)}
                title={title}
                data={props}
                lang={lang}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Modal;
