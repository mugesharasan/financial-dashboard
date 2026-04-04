import React, { useState } from 'react';

const AddYearModal = ({ isOpen, onClose, onSubmit }) => {
  
  const [formData, setFormData] = useState({
    tangible: 0,
    capital_wip: 0,
    non_current_investments: 0,
    long_term_loans: 0,
    inventories: 0,
    trade_receivables: 0,
    cash_bank: 0,
    short_term_loans: 0,
    other_current: 0
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const total_current = formData.inventories + formData.trade_receivables + formData.cash_bank + formData.short_term_loans + formData.other_current;
    const total_assets = formData.tangible + formData.capital_wip + formData.non_current_investments + formData.long_term_loans + total_current;

    const newYearEntry = {
      year: "2025-03-31",
      nature: "STANDALONE",
      bs: {
        assets: {
          tangible_assets: formData.tangible,
          intangible_assets: 0,
          noncurrent_investments: formData.non_current_investments,
          long_term_loans_and_advances: formData.long_term_loans,
          other_noncurrent_assets: 0,
          current_investments: 0,
          inventories: formData.inventories,
          trade_receivables: formData.trade_receivables,
          cash_and_bank_balances: formData.cash_bank,
          short_term_loans_and_advances: formData.short_term_loans,
          other_current_assets: formData.other_current,
          given_assets_total: total_assets
        },
        subTotals: {
          net_fixed_assets: formData.tangible,
          total_current_assets: total_current,
          capital_wip: formData.capital_wip,
          total_other_non_current_assets: formData.non_current_investments + formData.long_term_loans
        }
      }
    };

    onSubmit(newYearEntry);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#432a61] p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Add Financials: 31 MAR 2025</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4">
           
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-[#432a61] uppercase border-b pb-1">Non-Current Assets</h3>
              <InputField label="Tangible Assets" name="tangible" onChange={handleChange} />
              <InputField label="Capital WIP" name="capital_wip" onChange={handleChange} />
              <InputField label="Non-Current Investments" name="non_current_investments" onChange={handleChange} />
              <InputField label="Long Term Loans" name="long_term_loans" onChange={handleChange} />
            </div>

           
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-[#432a61] uppercase border-b pb-1">Current Assets</h3>
              <InputField label="Inventories" name="inventories" onChange={handleChange} />
              <InputField label="Trade Receivables" name="trade_receivables" onChange={handleChange} />
              <InputField label="Cash & Bank" name="cash_bank" onChange={handleChange} />
              <InputField label="Short Term Loans" name="short_term_loans" onChange={handleChange} />
              <InputField label="Other Current Assets" name="other_current" onChange={handleChange} />
            </div>
          </div>

          <div className="flex gap-3 pt-8">
            <button type="submit" className="flex-1 bg-[#432a61] text-white py-3 rounded-lg font-bold hover:opacity-90 shadow-lg transition-all">
              Add 31 MAR 2025 Column
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const InputField = ({ label, name, onChange }) => (
  <div>
    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</label>
    <input 
      type="number" 
      name={name}
      required 
      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-[#432a61]/20 outline-none border-gray-200"
      onChange={onChange}
    />
  </div>
);

export default AddYearModal;