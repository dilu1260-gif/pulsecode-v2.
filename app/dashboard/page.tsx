import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Workspace from "@/components/Workspace";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />
        <Workspace />
      </div>
    </div>
  );
}