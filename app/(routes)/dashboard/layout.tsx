//ai health doctor
import React from "react";
import AppHeader from "./_components/AppHeader";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen" style={{ background: "#f0fdf4" }}>
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
