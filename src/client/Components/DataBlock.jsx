import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';

const DataBlock = (
  { 
  title,
  data,
  columns,
  selectedIds,
  setSelectedIds,
  renderRow,
  noDataMessage = "No Data Found",
 }
 ) => {

  const value = (title) => {
    if (title === 'Option Trades' || title === 'Stock Trades') {
      return true
    } else {
      return false
    }
  }

  const [isOpen, setIsOpen] = useState(value(title));

  const handleRowClick = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleOpen = (view) => {
    setIsOpen(view);
  };

  return (
    <>
      <div className='flex justify-between items-center mx-3'>
        <h2 className='text-xl mb-1 font-bold'>{title}</h2>
        {isOpen ? <FaRegEye onClick={() => handleOpen(false)} /> : <FaRegEyeSlash onClick={() => handleOpen(true)} />}
      </div>
      <div className={`border border-sky-500 px-2 rounded-md mb-5 block-container ${isOpen ? 'show' : ''}`}>
        <div className="overflow-x-auto h-[16rem]">
          <table>
            <thead>
              <tr className='text-left'>
                {columns.map((col, index) => (
                  <th key={index} className={col.className || 'text-lg'}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length ?
                data.map((item) => (
                  <tr
                    className={`text-left cursor-pointer ${
                      selectedIds.includes(item._id)
                        ? 'bg-indigo-600 text-white transition-all ease-in'
                        : 'bg-transparent transition-all ease-in'
                    }`}
                    key={item._id}
                    onClick={() => handleRowClick(item._id)}
                  >
                    {renderRow(item)}
                  </tr>
                ))
              :
                <tr><td className='text-center' colSpan={columns.length}>{noDataMessage}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DataBlock