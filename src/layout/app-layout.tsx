import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar/>
          <div className="flex-1">
            <Header />
            <main className="p-4">
              <Outlet />
            </main>
          </div>
      </div>
    </>
  );
};

export default AppLayout;
