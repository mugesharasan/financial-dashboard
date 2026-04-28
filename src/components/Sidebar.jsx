import { NavLink } from "react-router-dom";
import {
  Flag, Building2, Users, IndianRupee,
  Star, BarChart3, FileText, PieChart
} from "lucide-react";

const menuItems = [
  { icon: Flag, path: "/dashboard" },
  { icon: Building2, path: "/companies" },
  { icon: Users, path: "/users" },
  { icon: IndianRupee, path: "/finance" },
  { icon: Star, path: "/ratings" },
  { icon: BarChart3, path: "/reports" },
  { icon: FileText, path: "/docs" },
  { icon: PieChart, path: "/analytics" },
];

export default function Sidebar() {
  return (
    <aside className="w-16 bg-[#432a61] flex flex-col items-center py-2 shadow-xl">
      {menuItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-icon ${isActive ? "sidebar-active" : ""}`
            }
          >
            <Icon size={18} />
          </NavLink>
        );
      })}
    </aside>
  );
}
