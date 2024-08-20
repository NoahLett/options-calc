import React from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegTrashCan } from 'react-icons/fa6';

const TransactionsBlock = ({ transactions, deleteSelectedTransactions, setSelectedTransactionIds, selectedTransactionIds }) => {

  const handleRowClick = (transactionId) => {
    setSelectedTransactionIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(transactionId)) {
        return prevSelectedIds.filter((id) => id !== transactionId);
      } else {
        return [...prevSelectedIds, transactionId];
      }
    });
  };

  const handleDeleteClick = () => {
    deleteSelectedTransactions(selectedTransactionIds);
    setSelectedTransactionIds([]);
  }

  return (
      <div className="overflow-x-auto h-[12rem]">
        <table>
          <thead>
            <tr className='text-left'>
              <th className='w-[14rem] sticky top-0 text-lg'>Type</th>
              <th className='w-[14rem] sticky top-0 text-lg'>Amount</th>
              <th className='w-[14rem] sticky top-0 text-lg'>Date</th>
              <th className='w-[14rem] sticky top-0 text-lg'>Live</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ?
              transactions.map((transaction) => (
                <tr 
                  className={`text-left cursor-pointer ${
                    selectedTransactionIds.includes(transaction._id)
                    ? 'bg-indigo-600 text-white transition-all ease-in'
                    : 'bg-transparent transition-all ease-in'
                  }`}
                  key={transaction._id}
                  onClick={() => handleRowClick(transaction._id)}  
                >
                  <td className='text-sm'>{transaction.transactionType === 'withdrawal' ? 'W' : 'D'}</td>
                  <td className='text-sm'>${transaction.amount}</td>
                  <td className='text-sm'>{formatDate(transaction.transactionDate)}</td>
                  <td className='text-sm'>{transaction.isHypothetical ? 'Yes' : 'No'}</td>
                </tr>
              ))
            :
                <tr><td className='text-center' colSpan={4}>No Transactions Found</td></tr>
            }
          </tbody>
        </table>
        <div
          className={`absolute inset-x-0 bottom-0 w-full ${
            selectedTransactionIds.length > 0 ? 'left-0' : 'left-[-999px]'
          } transition-all ease-in-out`}
        >
          <button
            className="bg-red-600 text-white py-4 rounded-md flex items-center justify-center hover:bg-red-700 w-full"
            onClick={handleDeleteClick}
          >
            Delete <FaRegTrashCan className="ml-2 text-sm" />
          </button>
        </div>
      </div>
  )
}

export default TransactionsBlock