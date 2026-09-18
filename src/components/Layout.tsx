import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
};

export default function Layout({ children, userName, userRole, onLogout }: LayoutProps) {
  return (
    <main className="min-h-screen bg-brand-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header userName={userName} userRole={userRole} onLogout={onLogout} />

        <section className="mt-6">{children}</section>

        <Footer />
      </div>
    </main>
  );
}
