import { apiService } from "@/services/apiService";
import ServerClient from "./client";

export default async function ServerPage({ params }) {
  const { server } = await params;

  const serverInfo = await apiService.getServerInfo(server);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${serverInfo.BACKGROUND})`,
        }}
        className="fixed w-screen h-screen inset-0 -z-10 opacity-20 blur-sm"
      ></div>
      <ServerClient serverInfo={serverInfo} />
    </>
  );
}
