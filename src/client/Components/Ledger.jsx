import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';

const Ledger = () => {
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

    const deleteOption = async (id) => {
        try {
            const response = await axios.delete(`/api/options/${id}`);
            setOptions(options.filter(option => option._id !== id));
            return response;
        } catch (error) {
            setError('Error in deleting option');
        }
    }

    const deleteTransaction = async (id) => {
        try {
            const response = await axios.delete(`/api/transaction/${id}`);
            setTransactions(transactions.filter(transaction => transaction._id !== id));
            return response;
        } catch (error) {
            setError('Error in deleting transaction')
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col justify-between m-2'>
            <div className='border border-sky-500 p-2 rounded-md mb-5'>
                <OptionsBlock options={options} deleteOption={deleteOption} />
            </div>
            <div className='border border-sky-500 p-2 rounded-md'>
                <TransactionsBlock transactions={transactions} deleteTransaction={deleteTransaction} />
            </div>
        </div>
    );
}

export default Ledger;
