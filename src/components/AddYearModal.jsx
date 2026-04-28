import React, { useState } from 'react';

const AddYearModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tangible: 0, capital_wip: 0, non_current_investments: 0, long_term_loans: 0,
    inventories: 0, trade_receivables: 0, cash_bank: 0, short_term_loans: 0, other_current: 0
  });

  const [units, setUnits] = useState({
    tangible: 'Units', capital_wip: 'Units', non_current_investments: 'Units',
    long_term_loans: 'Units', inventories: 'Units', trade_receivables: 'Units',
    cash_bank: 'Units', short_term_loans: 'Units', other_current: 'Units'
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  const handleUnitChange = (name, unit) => setUnits({ ...units, [name]: unit });

  const getActualValue = (name) => {
    const val = formData[name];
    const unit = units[name];
    if (unit === 'Cr') return val * 10000000;
    if (unit === 'L') return val * 100000;
    return val;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = {
      tangible: getActualValue('tangible'),
      capital_wip: getActualValue('capital_wip'),
      non_invest: getActualValue('non_current_investments'),
      long_loans: getActualValue('long_term_loans'),
      inv: getActualValue('inventories'),
      trade: getActualValue('trade_receivables'),
      cash: getActualValue('cash_bank'),
      short: getActualValue('short_term_loans'),
      other: getActualValue('other_current')
    };

    const total_current = res.inv + res.trade + res.cash + res.short + res.other;
    const total_assets = res.tangible + res.capital_wip + res.non_invest + res.long_loans + total_current;

    const newEntry = {
      year: "2025-03-31",
      nature: "STANDALONE",
      bs: {
        assets: {
          tangible_assets: res.tangible,
          noncurrent_investments: res.non_invest,
          long_term_loans_and_advances: res.long_loans,
          inventories: res.inv,
          trade_receivables: res.trade,
          cash_and_bank_balances: res.cash,
          short_term_loans_and_advances: res.short,
          other_current_assets: res.other,
          given_assets_total: total_assets
        },
        subTotals: {
          net_fixed_assets: res.tangible,
          total_current_assets: total_current,
          capital_wip: res.capital_wip,
          total_other_non_current_assets: res.non_invest + res.long_loans
        }
      }
    };
    onSubmit(newEntry);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl border border-gray-100 overflow-hidden">
        <div className="bg-[#432a61] p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold uppercase tracking-tight">Add Financials: 31 MAR 2025</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-[#432a61] uppercase border-b pb-1">Non-Current Assets</h3>
              {['tangible', 'capital_wip', 'non_current_investments', 'long_term_loans'].map(f => (
                <InputField key={f} label={f.replace(/_/g, ' ')} name={f} unit={units[f]} onUnitChange={handleUnitChange} onChange={handleChange} />
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-[#432a61] uppercase border-b pb-1">Current Assets</h3>
              {['inventories', 'trade_receivables', 'cash_bank', 'short_term_loans', 'other_current'].map(f => (
                <InputField key={f} label={f.replace(/_/g, ' ')} name={f} unit={units[f]} onUnitChange={handleUnitChange} onChange={handleChange} />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-8">
            <button type="submit" className="flex-1 bg-[#432a61] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all">Add 31 MAR 2025 Column</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-bold">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, unit, onUnitChange, onChange }) => (
  <div>
    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</label>
    <div className="flex shadow-sm">
      <input type="number" name={name} step="0.01" required className="flex-1 border border-r-0 rounded-l-md p-2 text-sm outline-none border-gray-200" onChange={onChange} />
      <select value={unit} onChange={(e) => onUnitChange(name, e.target.value)} className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-r-md px-2 outline-none">
        <option value="Units">₹</option>
        <option value="L">L</option>
        <option value="Cr">Cr</option>
      </select>
    </div>
  </div>
);

export default AddYearModal;