import React from 'react';
import formatDate from '../lib/dateFormater';
import DataBlock from './DataBlock';

const StocksBlock = ({ stocks, selectedStockIds, setSelectedStockIds }) => {
  const columns = [
    { label: 'Ticker', className: 'pr-5 text-lg' },
    { label: 'Trade', className: 'pr-5 text-lg' },
    { label: 'Price', className: 'pr-5 text-lg' },
    { label: 'Quote', className: 'pr-5 text-lg' },
    { label: 'Date', className: 'pr-12 text-lg' },
  ];

  const renderRow = (stock) => (
    <>
      <td className='text-sm'>{stock.ticker}</td>
      <td className='text-sm'>{stock.action.toUpperCase() + ' ' + stock.quantity}</td>
      <td className='text-sm'>${stock.tradePrice}</td>
      <td className='text-sm'>${stock.currentPrice}</td>
      <td className='text-sm'>{formatDate(stock.tradeDate)}</td>
    </>
  );
  
  return (
    <DataBlock
      title="Stock Trades"
      data={stocks}
      columns={columns}
      selectedIds={selectedStockIds}
      setSelectedIds={setSelectedStockIds}
      renderRow={renderRow}
      noDataMessage="No Stock Trades Found"
    />
  )
}

export default StocksBlock;