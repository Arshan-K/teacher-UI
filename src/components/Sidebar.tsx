// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-black text-white w-60 min-h-screen p-4">
      <nav className="flex flex-col gap-4">
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
  );
};

export default Sidebar;
