import React from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';
import FeesBlock from './FeesBlock';
import { FaRegTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Ledger = (
      { options, 
      transactions,
      fees, 
      setOptions, 
      setTransactions,
      setFees,
      selectedTransactionIds, 
      setSelectedTransactionIds,
      selectedOptionIds,  
      setSelectedOptionIds,
      selectedFeeIds, 
      setSelectedFeeIds,
        }) => {

    const handleDeleteClick = async () => {
        try {
            if (selectedOptionIds.length) {
            await Promise.all(
                selectedOptionIds.map(optionId =>
                axios.delete(`/api/options/${optionId}`)
                )
            );
            setOptions(prevOptions => prevOptions.filter(option => !selectedOptionIds.includes(option._id)));
            setSelectedOptionIds([]);
            }
    
            if (selectedTransactionIds.length) {
            await Promise.all(
                selectedTransactionIds.map(transactionId =>
                axios.delete(`/api/transactions/${transactionId}`)
                )
            );
            setTransactions(prevTransactions => prevTransactions.filter(transaction => !selectedTransactionIds.includes(transaction._id)));
            setSelectedTransactionIds([]);
            }
    
            if (selectedFeeIds.length) {
            await Promise.all(
                selectedFeeIds.map(feeId =>
                axios.delete(`/api/fees/${feeId}`)
                )
            );
            setFees(prevFees => prevFees.filter(fee => !selectedFeeIds.includes(fee._id)));
            setSelectedFeeIds([]);
            }
            toast.success('Items deleted successfully');
        } catch (error) {
            toast.error('Failed to delete items');
            console.error(error);
        }
    };

    const shouldShowDeleteButton = selectedOptionIds.length > 0 || selectedTransactionIds.length > 0 || selectedFeeIds.length > 0;

    return (
        <div className='flex flex-col justify-between'>
            <h2 className='text-xl ml-3 mb-1 font-bold'>Option Trades</h2>
            <div className='border border-sky-500 p-2 rounded-md mb-5'>
                <OptionsBlock 
                  options={options} 
                  setSelectedOptionIds={setSelectedOptionIds}
                  selectedOptionIds={selectedOptionIds}
                  selectedTransactionIds={selectedTransactionIds}
                  selectedFeeIds={selectedFeeIds}  
                />
            </div>
            <h2 className='text-xl ml-3 mb-1 font-bold'>Deposits &amp; Withdrawals</h2>
            <div className='border border-sky-500 p-2 rounded-md mb-5'>
                <TransactionsBlock 
                  transactions={transactions} 
                  setSelectedTransactionIds={setSelectedTransactionIds}
                  selectedTransactionIds={selectedTransactionIds}
                  selectedOptionIds={selectedOptionIds}
                  selectedFeeIds={selectedFeeIds}
                />
            </div>
            <h2 className='text-xl ml-3 mb-1 font-bold'>Commissions &amp; Fees</h2>
            <div className='border border-sky-500 p-2 rounded-md'>
                <FeesBlock 
                  fees={fees} 
                  setSelectedFeeIds={setSelectedFeeIds}
                  selectedFeeIds={selectedFeeIds}
                  selectedOptionIds={selectedOptionIds}
                  selectedTransactionIds={selectedTransactionIds}
                />
            </div>
            {shouldShowDeleteButton && (
                <div className="fixed bottom-0 left-0 w-full">
                <button
                    className="bg-red-600 text-white py-4 rounded-md flex items-center justify-center hover:bg-red-700 w-full"
                    onClick={handleDeleteClick}
                >
                    Delete <FaRegTrashCan className="ml-2 text-sm" />
                </button>
                </div>
            )}
        </div>
    );
}

export default Ledger;
