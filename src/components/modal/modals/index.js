import dynamic from "next/dynamic";

export const modals = [
  {
    name: "SETTINGS",
    component: dynamic(() => import("./settings")),
  },
  {
    name: "PANEL",
    component: dynamic(() => import("./panel")),
  },
];
