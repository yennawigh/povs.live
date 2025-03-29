import Icon from "@/components/icon";
import { memo } from "react";

const buttonBaseStyles =
  "transition-colors cursor-pointer flex items-center justify-center rounded h-full w-[50px] font-bold border border-dashed border-transparent dark:border-transparent hover:border-black/20 dark:hover:border-white/15";

const sendButtonStyles = `dark:bg-green-600/80 bg-green-500/80 text-white dark:text-white hover:text-black dark:hover:text-white hover:bg-transparent dark:hover:bg-transparent ${buttonBaseStyles}`;

const closeButtonStyles = `dark:bg-red-600/80 bg-red-500/80 hover:bg-transparent dark:hover:bg-transparent ${buttonBaseStyles}`;

export const ModalHeader = memo(({ title, close, modalContact }) => (
  <div className="flex justify-between items-center h-16 p-2 border-b border-black/20 dark:border-white/15 border-dashed">
    <h3 className="text-xl font-bold ml-2">{title}</h3>
    <div className="flex items-center space-x-2 h-full">
      {modalContact && (
        <button onClick={modalContact.event} className={sendButtonStyles}>
          <Icon icon={modalContact.icon} size={25} />
        </button>
      )}
      <button
        className={closeButtonStyles}
        aria-label="Close modal"
        onClick={close}
      >
        <Icon icon="clarity:close-line" size={25} />
      </button>
    </div>
  </div>
));
