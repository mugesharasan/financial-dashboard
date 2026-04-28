import React, { useState, useEffect } from 'react';
import {
  Menu, Flag, Building2, Users, IndianRupee, Star, BarChart3,
  FileText, PieChart, Network, Scale, ClipboardList, FileBox, Cpu, Trash2
} from 'lucide-react';
import AddYearModal from './AddYearModal';
import FinoLogo from '../assets/finoscale_logo.jpg';
import '../styles/TableStyles.css';
import { useNavigate } from 'react-router-dom';

const FinancialTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("finance");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5001/financials")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Error fetching financials:", err));
  }, []);

  const formatINR = (val) =>
    new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val || 0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteColumn = async (id) => {
    try {
      await fetch(`http://localhost:5001/financials/${id}`, {
        method: "DELETE"
      });
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const Row = ({ label, jsonPath, isHeader = false, isTotal = false, boldLabel = false }) => {
    const getValue = (obj, path) =>
      path.split(".").reduce((acc, part) => acc && acc[part], obj);

    return (
      <tr className={`${isHeader ? "bg-gray-50" : ""} ${isTotal ? "font-bold bg-gray-50/50" : ""} border-b border-gray-100`}>
        <td className={`p-3 text-sm whitespace-nowrap ${boldLabel || isHeader ? "font-bold text-slate-800" : "text-slate-600 pl-6"}`}>
          {label}
        </td>
        {data.map((yr) => (
          <td key={yr.id} className="p-3 text-right text-sm border-l border-gray-50 text-slate-700">
            {jsonPath ? formatINR(getValue(yr, jsonPath)) : "0.00"}
          </td>
        ))}
      </tr>
    );
  };

  const renderFinanceTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse financial-table">
        <thead>
          <tr>
            <th className="text-left w-[250px] border-b border-gray-200 p-3">PARTICULARS</th>
            {data.map((yr) => (
              <th key={yr.id} className="text-right min-w-[180px] border-b border-gray-200 p-3">
                <div className="flex items-center justify-end gap-2">
                  <FileText size={12} className="text-red-400" />
                  <span className="text-[11px] font-bold text-gray-500">
                    {new Date(yr.year).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }).toUpperCase()}
                  </span>
                  <button onClick={() => handleDeleteColumn(yr.id)}>
                    <Trash2 size={14} className="text-gray-400 hover:text-red-600" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Assets" isHeader />
          <Row label="Net Fixed Assets" boldLabel />
          <Row label="Tangible Assets" jsonPath="bs.assets.tangible_assets" />
          <Row label="Total Net Fixed Assets" jsonPath="bs.subTotals.net_fixed_assets" isTotal />
          <Row label="Other Non-current Assets" boldLabel />
          <Row label="Non Current Investments" jsonPath="bs.assets.noncurrent_investments" />
          <Row label="Current Assets" isHeader />
          <Row label="Inventories" jsonPath="bs.assets.inventories" />
          <Row label="Trade Receivables" jsonPath="bs.assets.trade_receivables" />
          <Row label="Total Assets" jsonPath="bs.assets.given_assets_total" isTotal />
        </tbody>
      </table>
    </div>
  );

  const renderDashboardCards = (title, items) => (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-700 mb-6 uppercase">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">{item.label}</p>
            <p className="text-xl font-bold text-slate-700">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "flag":
        return renderDashboardCards("Country Analysis", [
          { label: "Country Risk", value: "Low" },
          { label: "Export Revenue", value: "₹2.4 Cr" },
          { label: "Domestic Revenue", value: "₹5.8 Cr" }
        ]);

      case "building":
        return renderDashboardCards("Company Overview", [
          { label: "Sector", value: "Pharmaceuticals" },
          { label: "Market Cap", value: "₹120 Cr" },
          { label: "Founded", value: "1998" }
        ]);

      case "users":
        return renderDashboardCards("User Metrics", [
          { label: "Active Analysts", value: "12" },
          { label: "Reviews Done", value: "86" },
          { label: "Pending Reviews", value: "7" }
        ]);

      case "star":
        return renderDashboardCards("Ratings", [
          { label: "Credit Rating", value: "AA" },
          { label: "Performance", value: "4.5/5" },
          { label: "Risk Grade", value: "Low" }
        ]);

      case "bar":
        return renderDashboardCards("Growth Analysis", [
          { label: "Revenue Growth", value: "18%" },
          { label: "Asset Growth", value: "22%" },
          { label: "Profit Growth", value: "14%" }
        ]);

      case "report":
        return renderDashboardCards("Reports", [
          { label: "Annual Reports", value: "12" },
          { label: "Quarterly Reports", value: "24" },
          { label: "Statements", value: "36" }
        ]);

      case "pie":
        return renderDashboardCards("Asset Distribution", [
          { label: "Current Assets", value: "40%" },
          { label: "Fixed Assets", value: "35%" },
          { label: "Investments", value: "25%" }
        ]);

      case "network":
        return renderDashboardCards("Entity Mapping", [
          { label: "Subsidiaries", value: "5" },
          { label: "Branches", value: "18" },
          { label: "Partners", value: "26" }
        ]);

      case "scale":
        return renderDashboardCards("Leverage Ratios", [
          { label: "Debt Ratio", value: "0.42" },
          { label: "Equity Ratio", value: "0.58" },
          { label: "Leverage", value: "1.8x" }
        ]);

      case "checklist":
        return renderDashboardCards("Compliance", [
          { label: "Audits Passed", value: "14" },
          { label: "Pending", value: "2" },
          { label: "Compliance Rate", value: "92%" }
        ]);

      case "filebox":
        return renderDashboardCards("Documents", [
          { label: "Reports", value: "26" },
          { label: "Filings", value: "18" },
          { label: "Statements", value: "42" }
        ]);

      case "cpu":
        return renderDashboardCards("AI Analytics", [
          { label: "Risk Score", value: "Low" },
          { label: "Forecast", value: "Positive" },
          { label: "Confidence", value: "89%" }
        ]);

      default:
        return renderFinanceTable();
    }
  };

  const sidebarItems = [
    { key: "flag", icon: Flag },
    { key: "building", icon: Building2 },
    { key: "users", icon: Users },
    { key: "finance", icon: IndianRupee },
    { key: "star", icon: Star },
    { key: "bar", icon: BarChart3 },
    { key: "report", icon: FileText },
    { key: "pie", icon: PieChart },
    { key: "network", icon: Network },
    { key: "scale", icon: Scale },
    { key: "checklist", icon: ClipboardList },
    { key: "filebox", icon: FileBox },
    { key: "cpu", icon: Cpu }
  ];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <aside className="w-16 bg-[#432a61] flex flex-col items-center py-2 shadow-xl shrink-0">
        {sidebarItems.map(({ key, icon: Icon }) => (
          <div
            key={key}
            onClick={() => setActiveSection(key)}
            className={`sidebar-icon cursor-pointer ${activeSection === key ? "sidebar-active" : ""}`}
          >
            <Icon size={18} />
          </div>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-[#f4f7fa] overflow-hidden">

        {/* Header */}
        <header className="h-14 bg-[#432a61] flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-6">
            <Menu className="text-white cursor-pointer" size={22} />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-white p-1">
                <img src={FinoLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">finoscale</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-medium">
              Welcome, {user?.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 overflow-auto">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-md font-bold text-slate-700 uppercase">
                FLEMING LABORATORIES LIMITED
              </h2>
            </div>

            {activeSection === "finance" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#63499f] hover:bg-[#432a61] text-white px-4 py-2 rounded-md text-xs font-bold transition-all shadow-md"
              >
                Add Latest Year Financials
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </main>

      <AddYearModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default FinancialTable;
