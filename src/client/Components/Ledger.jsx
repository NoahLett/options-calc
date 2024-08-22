import React from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';
import FeesBlock from './FeesBlock';
import { toast } from 'react-toastify';

const Ledger = (
      { options, 
      transactions, 
      setOptions, 
      setTransactions, 
      setSelectedTransactionIds, 
      selectedTransactionIds, 
      setSelectedOptionIds, 
      selectedOptionIds,
      setSelectedFeeIds,
      selectedFeeIds,
      setFees,
      fees,
        }) => {

    const deleteSelectedOptions = async (selectedOptionIds) => {
        try {
            const deletePromises = selectedOptionIds.map(id =>
                axios.delete(`/api/options/${id}`)
            );
            await Promise.all(deletePromises);
            setOptions(options.filter(option => !selectedOptionIds.includes(option._id)));
            toast.success('Option trade deleted');
        } catch (error) {
            toast.error('Failed to delete option');
        }
    };

    const deleteSelectedTransactions = async (selectedTransactionIds) => {
        try {
            const deletePromises = selectedTransactionIds.map(id =>
                axios.delete(`/api/transactions/${id}`)
            );
            await Promise.all(deletePromises);
            setTransactions(transactions.filter(transaction => !selectedTransactionIds.includes(transaction._id)));
            toast.success('Transaction deleted');
        } catch (error) {
            toast.error('Failed to delete transaction');
        }
    };

    const deleteSelectedFees = async (selectedFeeIds) => {
        try {
            const deletePromises = selectedFeeIds.map(id =>
                axios.delete(`/api/fees/${id}`)
            );
            await Promise.all(deletePromises);
            setFees(fees.filter(fee => !selectedFeeIds.includes(fee._id)));
            toast.success('Fee deleted');
        } catch (error) {
            toast.error('Failed to delete fee');
        }
    };

    return (
        <div className='flex flex-col justify-between'>
            <h2 className='text-xl ml-3 mb-1 font-bold'>Option Trades</h2>
            <div className='border border-sky-500 p-2 rounded-md mb-5'>
                <OptionsBlock 
                  options={options} 
                  deleteSelectedOptions={deleteSelectedOptions}
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
                  deleteSelectedTransactions={deleteSelectedTransactions}
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
                  deleteSelectedFees={deleteSelectedFees}
                  setSelectedFeeIds={setSelectedFeeIds}
                  selectedFeeIds={selectedFeeIds}
                  selectedOptionIds={selectedOptionIds}
                  selectedTransactionIds={selectedTransactionIds}
                />
            </div>
        </div>
    );
}

export default Ledger;
