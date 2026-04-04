import React, { useState } from 'react';
import { 
  Menu, Flag, Building2, Users, IndianRupee, Star, BarChart3, 
  FileText, PieChart, Network, Scale, ClipboardList, FileBox, Cpu 
} from 'lucide-react';
import initialData from '../data/financials.json';
import AddYearModal from './AddYearModal';
import '../styles/TableStyles.css';


import FinoLogo from '../assets/finoscale_logo.jpg'; 

const FinancialTable = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val || 0);
  };

  const handleAddNewYear = (newYear) => {
    setData([newYear, ...data]);
    setIsModalOpen(false);
  };

  const Row = ({ label, jsonPath, isHeader = false, isTotal = false, boldLabel = false }) => {
    const getValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
    return (
      <tr className={`${isHeader ? 'bg-gray-50' : ''} ${isTotal ? 'font-bold bg-gray-50/50' : ''} border-b border-gray-100`}>
        <td className={`p-3 text-sm whitespace-nowrap ${boldLabel || isHeader ? 'font-bold text-slate-800' : 'text-slate-600 pl-6'}`}>
          {label}
        </td>
        {data.map((yr, idx) => (
          <td key={idx} className="p-3 text-right text-sm number-font border-l border-gray-50 text-slate-700">
            {jsonPath ? formatINR(getValue(yr, jsonPath)) : "0.00"}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      
      <aside className="w-16 bg-[#3C1B5F] flex flex-col items-center py-2 shadow-xl shrink-0">
        <div className="sidebar-icon"><Flag size={18} /></div>
        <div className="sidebar-icon"><Building2 size={18} /></div>
        <div className="sidebar-icon"><Users size={18} /></div>
        <div className="sidebar-icon"><IndianRupee size={18} /></div>
        <div className="sidebar-icon"><Star size={18} /></div>
        <div className="sidebar-icon sidebar-active"><BarChart3 size={18} /></div>
        <div className="sidebar-icon"><FileText size={18} /></div>
        <div className="sidebar-icon"><PieChart size={18} /></div>
        <div className="sidebar-icon"><Network size={18} /></div>
        <div className="sidebar-icon"><Scale size={18} /></div>
        <div className="sidebar-icon"><ClipboardList size={18} /></div>
        <div className="sidebar-icon"><FileBox size={18} /></div>
        <div className="sidebar-icon"><Cpu size={18} /></div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#f4f7fa] overflow-hidden">
        
        <header className="h-14 bg-[#3C1B5F] flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-6">
            <Menu className="text-white cursor-pointer" size={22} />
            
           
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                <img src={FinoLogo} alt="Finoscale Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">finoscale</span>
            </div>
          </div>
        </header>

        
        <div className="p-6 overflow-auto">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div></div>
              <h2 className="text-md font-bold text-slate-700 uppercase">FLEMING LABORATORIES LIMITED</h2>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#3C1B5F] hover:bg-[#432a61] text-white px-4 py-2 rounded-md text-xs font-bold transition-all shadow-md"
            >
              Add Latest Year Financials
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse financial-table">
                <thead>
                  <tr>
                    <th className="text-left w-[250px] border-b border-gray-200">Particulars</th>
                    {data.map((yr, idx) => (
                      <th key={idx} className="text-right min-w-[160px] border-b border-gray-200">
                         <div className="flex items-center justify-end gap-1">
                           <FileText size={12} className="text-red-400" />
                           {new Date(yr.year).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase()}
                         </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Row label="Assets" isHeader />
                  <Row label="Net Fixed Assets" boldLabel />
                  <Row label="Tangible Assets" jsonPath="bs.assets.tangible_assets" />
                  <Row label="Intangible Assets" jsonPath="bs.assets.intangible_assets" />
                  <Row label="Total Net Fixed Assets" jsonPath="bs.subTotals.net_fixed_assets" isTotal />
                  <Row label="Capital Work In Progress" jsonPath="bs.subTotals.capital_wip" boldLabel />
                  
                  <Row label="Other Non-current Assets" boldLabel />
                  <Row label="Non Current Investments" jsonPath="bs.assets.noncurrent_investments" />
                  <Row label="Net Deferred Tax Assets" jsonPath="bs.assets.deferred_tax_assets_net" />
                  <Row label="Long Term Loans and Advances" jsonPath="bs.assets.long_term_loans_and_advances" />
                  <Row label="Other Non Current Assets" jsonPath="bs.assets.other_noncurrent_assets" />
                  <Row label="Total Other Non Current Assets" jsonPath="bs.subTotals.total_other_non_current_assets" isTotal />

                  <Row label="Current Assets" isHeader />
                  <Row label="Current Investments" jsonPath="bs.assets.current_investments" />
                  <Row label="Inventories" jsonPath="bs.assets.inventories" />
                  <Row label="Trade Receivables" jsonPath="bs.assets.trade_receivables" />
                  <Row label="Cash And Bank Balances" jsonPath="bs.assets.cash_and_bank_balances" />
                  <Row label="Short Term Loans And Advances" jsonPath="bs.assets.short_term_loans_and_advances" />
                  <Row label="Other Current Assets" jsonPath="bs.assets.other_current_assets" />
                  <Row label="Total Current Assets" jsonPath="bs.subTotals.total_current_assets" isTotal />

                  <tr className="bg-white font-bold border-t-2 border-gray-200">
                    <td className="p-4 text-sm text-slate-900 uppercase">Total Assets</td>
                    {data.map((yr, idx) => (
                      <td key={idx} className="p-4 text-right text-sm number-font border-l border-gray-50 text-slate-900">
                        {formatINR(yr.bs.assets.given_assets_total)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <AddYearModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNewYear} />
    </div>
  );
};

export default FinancialTable;