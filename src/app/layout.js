import { SettingsProvider } from "@/contexts/settings-context";
import { ModalProvider } from "@/contexts/modal-context";
import { montserrat } from "@/fonts";
import './globals.css';

export default function RootLayout({ children }) {
  const Providers = ({ children }) => {
    return (
      <SettingsProvider>
        <ModalProvider>{children}</ModalProvider>
      </SettingsProvider>
    );
  };

  const bodyClasses = [
    montserrat.className,
    "dark:text-white text-black",
    "bg-white dark:bg-black",
    "scroll-smooth",
    "antialiased",
    "box-border",
  ].join(" ");

  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={bodyClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
