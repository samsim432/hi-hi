import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
      <div className="fixed -left-24 top-28 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="fixed -right-24 bottom-20 -z-10 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />

      <Navbar />

      <main className="pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;