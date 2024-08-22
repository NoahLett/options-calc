import React, { useState, useEffect } from 'react';

const FeeForm = ({ addRelatedFee, removeRelatedFee, updateFee, fees }) => {
  const [expandedFees, setExpandedFees] = useState([]);

  useEffect(() => {
    setExpandedFees(fees.map(() => true));
  }, [fees]);

  const handleRemoveFee = (id, index) => {
    const updatedExpandedFees = [...expandedFees];
    updatedExpandedFees[index] = false;
    setExpandedFees(updatedExpandedFees);

    setTimeout(() => {
      removeRelatedFee(id);
    }, 300);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="text-white">Fees</label>
        <button
          type="button"
          onClick={addRelatedFee}
          className="bg-green-600 text-white py-1 px-2 rounded-md"
        >
          Add Fee
        </button>
      </div>

      {fees.map((fee, index) => (
        <div
          key={fee.id}  // Use unique key
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFees[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ transition: 'max-height 0.3s ease, opacity 0.3s ease' }}
        >
          <div className="space-y-2 mt-2 border border-gray-500 p-2 rounded-md">
            <div className="flex justify-between items-center">
              <label className="text-white">Fee {index + 1}</label>
              <button
                type="button"
                onClick={() => handleRemoveFee(fee.id, index)}
                className="bg-red-600 text-white py-1 px-2 rounded-md"
              >
                Remove Fee
              </button>
            </div>

            <div className="flex flex-col">
              <label className="text-white">Fee Type</label>
              <select
                value={fee.feeType}
                onChange={(e) => updateFee(fee.id, 'feeType', e.target.value)}
                className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
              >
                <option value="commissions">Commissions</option>
                <option value="misc">Miscellaneous</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-white">Fee Amount</label>
              <input
                type="number"
                value={fee.amount}
                onChange={(e) => updateFee(fee.id, 'amount', e.target.value)}
                placeholder="E.g. 5.00"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={fee.isHypothetical}
                onChange={(e) => updateFee(fee.id, 'isHypothetical', e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 block text-white">Is Hypothetical?</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeeForm;
