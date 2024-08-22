import React from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegTrashCan } from 'react-icons/fa6';

const FeesBlock = (
      { 
        fees,
        deleteSelectedFees,
        setSelectedFeeIds,
        selectedFeeIds,
        selectedOptionIds,
        selectedTransactionIds,
      }) => {

  const handleRowClick = (feeId) => {
    if (!selectedOptionIds.length && !selectedTransactionIds.length) {
      setSelectedFeeIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(feeId)) {
          return prevSelectedIds.filter((id) => id !== feeId);
        } else {
          return [...prevSelectedIds, feeId];
        }
      });
    }
  };

  const handleDeleteClick = () => {
    deleteSelectedFees(selectedFeeIds);
    setSelectedFeeIds([]);
  }

  return (
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
            {fees.length ?
              fees.map((fee) => (
                <tr 
                  className={`text-left cursor-pointer ${
                    selectedFeeIds.includes(fee._id)
                    ? 'bg-indigo-600 text-white transition-all ease-in'
                    : 'bg-transparent transition-all ease-in'
                  }`}
                  key={fee._id}
                  onClick={() => handleRowClick(fee._id)}  
                >
                  <td className='text-sm'>{fee.feeType === 'commissions' ? 'Commissions' : 'Misc Fee'}</td>
                  <td className='text-sm'>${fee.amount}</td>
                  <td className='text-sm'>{formatDate(fee.feeDate)}</td>
                  <td className='text-sm'>{fee.isHypothetical ? 'Yes' : 'No'}</td>
                </tr>
              ))
            :
                <tr><td className='text-center' colSpan={4}>No Fees Found</td></tr>
            }
          </tbody>
        </table>
        <div
          className={`absolute inset-x-0 bottom-0 w-full ${
            selectedFeeIds.length > 0 ? 'left-0' : 'left-[-9999px]'
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

export default FeesBlock