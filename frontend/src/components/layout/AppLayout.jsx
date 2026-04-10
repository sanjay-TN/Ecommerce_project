import Footer from "./Footer";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-shell py-8">{children}</main>
      <Footer />
    </div>
  );
}
