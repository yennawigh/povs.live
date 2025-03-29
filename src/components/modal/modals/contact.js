import { ModalHeader } from "./title";
import { useState } from "react";
import { apiService } from "@/services/apiService";
import { CONVERT_LANG } from "@/lib/utils";

export default function Contact({ lang, title, close, data }) {
  const [message, setMessage] = useState("");
  const server = data;

  const sendMessage = async () => {
    if (!message.trim()) return;

    const success = await apiService.sendMessage(server.NAME, message);
    if (success) {
      setMessage("");
      close();
    }
  };

  return (
    <>
      <ModalHeader
        close={close}
        modalContact={{
          icon: "material-symbols:send",
          event: sendMessage,
        }}
        title={title}
      />
      <div className="w-full sm:w-[600px] h-80 rounded bg-black/10 dark:bg-white/5 relative p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full appearance-none text-justify bg-transparent dark:bg-transparent break-all overflow-hidden overflow-y-auto"
          style={{ resize: "none" }}
          placeholder={CONVERT_LANG(
            lang,
            "Mesajınızı buraya girin...",
            "Enter your message here..."
          )}
        />
      </div>
    </>
  );
}
