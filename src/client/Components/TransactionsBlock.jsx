import React from 'react';
import formatDate from '../lib/dateFormater';
import DataBlock from './DataBlock';

const TransactionsBlock = ({ transactions, selectedTransactionIds, setSelectedTransactionIds }) => {
  const columns = [
    { label: 'Type', className: 'w-[14rem] text-lg' },
    { label: 'Amount', className: 'w-[14rem] text-lg' },
    { label: 'Date', className: 'w-[14rem] text-lg' },
    { label: 'Live', className: 'w-[14rem] text-lg' },
  ];

  const renderRow = (transaction) => (
    <>
      <td className='text-sm'>{transaction.transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}</td>
      <td className='text-sm'>${transaction.amount}</td>
      <td className='text-sm'>{formatDate(transaction.transactionDate)}</td>
      <td className='text-sm'>{transaction.isHypothetical ? 'No' : 'Yes'}</td>
    </>
  );

  return (
    <DataBlock
      title="Deposits &amp; Withdrawals"
      data={transactions}
      columns={columns}
      selectedIds={selectedTransactionIds}
      setSelectedIds={setSelectedTransactionIds}
      renderRow={renderRow}
      noDataMessage="No Transfers Found"
    />
  );
};

export default TransactionsBlock;
