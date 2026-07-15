import Workspace from "@/Workspace";
import WorkspaceInitializer from "@/core/workspace/WorkspaceInitializer";

export default function Home() {
  return (
    <>
      <WorkspaceInitializer />

      <Workspace />
    </>
  );
}