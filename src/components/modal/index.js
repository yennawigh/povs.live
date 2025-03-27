import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/contexts/modal-context";
import { useEffect, memo } from "react";
import { modals } from "./modals";
import Icon from "../icon";

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

const ModalHeader = memo(({ title, onClose }) => (
  <div className="flex justify-between items-center h-16 p-2 border-b border-black/20 dark:border-white/15">
    <h3 className="text-xl font-bold ml-2">{title}</h3>
    <button
      className="bg-red-500/20 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center rounded h-full w-[50px]"
      onClick={onClose}
      aria-label="Close modal"
    >
      <Icon icon="clarity:close-line" size={25} />
    </button>
  </div>
));

const getModalStyles = (position) => {
  const baseStyles =
    "relative border border-black/20 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-md w-auto";

  return position === "left" || position === "right"
    ? `${baseStyles} h-screen`
    : position === "screen"
    ? `${baseStyles} w-screen h-screen border-none`
    : position === "bottom"
    ? `${baseStyles} bottom-8 rounded-md`
    : `${baseStyles} rounded-md`;
};

const Modal = memo(({ name, title, position = "center", props, isOpen }) => {
  const { closeModal } = useModal();
  const modalConfig = modals.find((m) => m.name === name);
  const Component = modalConfig?.component;

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
      ? "h-auto overflow-y-auto pb-10"
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
            className={getModalStyles(position)}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            {...animation}
          >
            <ModalHeader title={title} onClose={() => closeModal(name)} />
            <div className={contentClassName}>
              <Component {...props} closeModal={() => closeModal(name)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Modal;
