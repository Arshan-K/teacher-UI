// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={clsx(
          "bg-black text-white w-60 p-4 fixed z-50 top-0 left-0 h-full transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:h-auto md:min-h-screen"
        )}
      >
        <nav className="flex flex-col gap-4 mt-16 md:mt-0">
          <Link
            href="/teachers"
            className={clsx(
              "px-3 py-2 rounded hover:bg-gray-800",
              pathname === "/teachers" && "bg-gray-800"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/teachers/add"
            className={clsx(
              "px-3 py-2 rounded hover:bg-gray-800",
              pathname === "/teachers/add" && "bg-gray-800"
            )}
          >
            Add Teacher
          </Link>
          <Link
            href="/teachers/insights"
            className={clsx(
              "px-3 py-2 rounded hover:bg-gray-800",
              pathname === "/teachers/insights" && "bg-gray-800"
            )}
          >
            Insights
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
