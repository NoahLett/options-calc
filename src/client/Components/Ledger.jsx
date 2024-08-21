import React from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';
import { toast } from 'react-toastify';

const Ledger = ({ options, transactions, setOptions, setTransactions, setSelectedTransactionIds, selectedTransactionIds, setSelectedOptionIds, selectedOptionIds }) => {

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
            setError('Error in deleting transactions');
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
            setError('Error in deleting transactions');
        }
    };

    return (
        <div className='flex flex-col justify-between'>
            <div className='border border-sky-500 p-2 rounded-md mb-5'>
                <OptionsBlock 
                  options={options} 
                  deleteSelectedOptions={deleteSelectedOptions}
                  setSelectedOptionIds={setSelectedOptionIds}
                  selectedOptionIds={selectedOptionIds}
                  selectedTransactionIds={selectedTransactionIds}  
                />
            </div>
            <div className='border border-sky-500 p-2 rounded-md'>
                <TransactionsBlock 
                  transactions={transactions} 
                  deleteSelectedTransactions={deleteSelectedTransactions}
                  setSelectedTransactionIds={setSelectedTransactionIds}
                  selectedTransactionIds={selectedTransactionIds}
                  selectedOptionIds={selectedOptionIds}
                />
            </div>
        </div>
    );
}

export default Ledger;
