import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[var(--mp-bg)]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[var(--mp-bg)]"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
