// src/components/Navbar.tsx
import { FaBars } from "react-icons/fa";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-red-600 text-white py-4 px-6 shadow flex items-center">
      <button
        className="md:hidden mr-4 text-xl"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <h1 className="text-xl font-bold">Teacher Dashboard</h1>
    </header>
  );
};

export default Navbar;
