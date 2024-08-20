import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';
import CircleLoader from 'react-spinners/CircleLoader';

const Ledger = ({ setSelectedTransactionIds, selectedTransactionIds, setSelectedOptionIds, selectedOptionIds }) => {
    const [options, setOptions] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchOptions = async () => {
            try {
                const response = await axios.get('/api/options');
                setOptions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching options');
                setLoading(false);
            }
        }
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching transactions');
                setLoading(false);
            }
        }
        fetchOptions();
        fetchTransactions();
    }, []);

    const deleteSelectedOptions = async (selectedOptionIds) => {
        try {
            const deletePromises = selectedOptionIds.map(id =>
                axios.delete(`/api/options/${id}`)
            );
            await Promise.all(deletePromises);
            setOptions(options.filter(option => !selectedOptionIds.includes(option._id)));
        } catch (error) {
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
        } catch (error) {
            setError('Error in deleting transactions');
        }
    };

    if (loading) {
        return (
            <div className='h-[80vh] flex justify-center items-center'>
                <CircleLoader color={'rgb(14 165 233)'} size={75} />
            </div>
        )    
    } 


    if (error) {
        return <div>{error}</div>;
    }

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
