import React from 'react';
import formatDate from '../lib/dateFormater';

const TransactionsBlock = (
      { 
        transactions,
        setSelectedTransactionIds, 
        selectedTransactionIds, 
      }) => {

  const handleRowClick = (transactionId) => {
      setSelectedTransactionIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(transactionId)) {
          return prevSelectedIds.filter((id) => id !== transactionId);
        } else {
          return [...prevSelectedIds, transactionId];
        }
      });
  };

  return (
    <>
      <h2 className='text-xl ml-3 mb-1 font-bold'>Deposits &amp; Withdrawals</h2>
      <div className='border border-sky-500 p-2 rounded-md mb-5'>
        <div className="overflow-x-auto h-[16rem]">
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
        </div>
      </div>
    </>
  )
}

export default TransactionsBlock