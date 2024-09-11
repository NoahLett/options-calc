import React from 'react';
import formatDate from '../lib/dateFormater';
import DataBlock from './DataBlock';

const FeesBlock = ({ fees, selectedFeeIds, setSelectedFeeIds }) => {
  const columns = [
    { label: 'Type', className: 'w-[14rem] text-lg' },
    { label: 'Amount', className: 'w-[14rem] text-lg' },
    { label: 'Date', className: 'w-[14rem] text-lg' },
    { label: 'Live', className: 'w-[14rem] text-lg' },
  ];

  const renderRow = (fee) => (
    <>
      <td className='text-sm'>{fee.feeType === 'commissions' ? 'Commissions' : 'Misc Fee'}</td>
      <td className='text-sm'>${fee.amount}</td>
      <td className='text-sm'>{formatDate(fee.feeDate)}</td>
      <td className='text-sm'>{fee.isHypothetical ? 'No' : 'Yes'}</td>
    </>
  );

  return (
    <DataBlock
      title="Commissions & Fees"
      data={fees}
      columns={columns}
      selectedIds={selectedFeeIds}
      setSelectedIds={setSelectedFeeIds}
      renderRow={renderRow}
      noDataMessage="No Fees Found"
    />
  );
};

export default FeesBlock;
