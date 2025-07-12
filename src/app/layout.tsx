// This file has NO "use client" directive

import "./globals.css";
import type { ReactNode } from "react";
import ResponsiveLayout from "@/components/ResponsiveLayout";

export const metadata = {
  title: "Teacher Dashboard",
  description: "Modern Teacher Management Interface",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}
