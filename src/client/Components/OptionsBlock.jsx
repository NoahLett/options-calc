import React from 'react';
import formatDate from '../lib/dateFormater';
import DataBlock from './DataBlock';

const OptionsBlock = ({ options, selectedOptionIds, setSelectedOptionIds }) => {
  const columns = [
    { label: 'Ticker', className: 'pr-5 text-lg' },
    { label: 'Trade', className: 'pr-24 text-lg' },
    { label: 'Premium', className: 'pr-5 text-lg' },
    { label: 'Start', className: 'pr-12 text-lg' },
    { label: 'Expires', className: 'pr-8 text-lg' },
    { label: 'BE', className: 'pr-12 text-lg' },
    { label: 'Live', className: 'pr-5 text-lg' },
  ];

  const renderRow = (option) => (
    <>
      <td className='text-sm'>{option.ticker}</td>
      <td className='text-sm'>{option.action.toUpperCase() + ' ' + option.quantity + ' ' + option.optionType.toUpperCase() + ' @ $' + option.strikePrice}</td>
      <td className='text-sm'>${option.price}</td>
      <td className='text-sm'>{formatDate(option.tradeDate)}</td>
      <td className='text-sm'>{formatDate(option.expirationDate)}</td>
      <td className='text-sm'>${option.breakEvenPoint}</td>
      <td className='text-sm'>{option.isHypothetical ? 'No' : 'Yes'}</td>
    </>
  );

  return (
    <DataBlock
      title="Option Trades"
      data={options}
      columns={columns}
      selectedIds={selectedOptionIds}
      setSelectedIds={setSelectedOptionIds}
      renderRow={renderRow}
      noDataMessage="No Option Trades Found"
    />
  );
};

export default OptionsBlock;
