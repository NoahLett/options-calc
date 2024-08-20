import React from 'react';

const ViewButtons = ({ showTransactionForm, showOptionForm, allowed }) => {
  return (
    <div className="flex justify-around my-4">
      <button
        className={`text-white py-2 px-3 rounded-md ${!allowed ? 'bg-slate-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={showTransactionForm}
        disabled={!allowed}
      >
        New Transaction
      </button>
      <button
        className={`text-white py-2 px-3 rounded-md ${!allowed ? 'bg-slate-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={showOptionForm}
        disabled={!allowed}
      >
        New Option
      </button>
    </div>
  )
}

export default ViewButtons