import React, { useState } from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const FeesBlock = (
      { 
        fees,
        setSelectedFeeIds,
        selectedFeeIds,
      }) => {

  const [isOpen, setIsOpen] = useState(true);

  const handleRowClick = (feeId) => {
      setSelectedFeeIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(feeId)) {
          return prevSelectedIds.filter((id) => id !== feeId);
        } else {
          return [...prevSelectedIds, feeId];
        }
      });
  };

  const handleOpen = (view) => {
    setIsOpen(view);
  }

  return (
    <>
      <div className='flex justify-between items-center mx-3'>
        <h2 className='text-xl mb-1 font-bold'>Commissions &amp; Fees</h2>
        {isOpen ? <FaRegEye onClick={() => handleOpen(false)} /> : <FaRegEyeSlash onClick={() => handleOpen(true)} />}
      </div>
      <div className={`border border-sky-500 p-2 rounded-md mb-5 block-container ${isOpen ? 'show' : ''}`}>
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
                    <td className='text-sm'>{fee.isHypothetical ? 'No' : 'Yes'}</td>
                  </tr>
                ))
              :
                  <tr><td className='text-center' colSpan={4}>No Fees Found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FeesBlock