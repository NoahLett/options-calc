import React from 'react';
import axios from 'axios';
import TransactionsBlock from './TransactionsBlock';
import OptionsBlock from './OptionsBlock';
import FeesBlock from './FeesBlock';
import StocksBlock from './StocksBlock';
import DeleteButton from './DeleteButton';
import { toast } from 'react-toastify';

const Ledger = (
      { options, 
      transactions,
      fees,
      stocks, 
      setOptions, 
      setTransactions,
      setFees,
      setStocks,
      selectedTransactionIds, 
      setSelectedTransactionIds,
      selectedOptionIds,  
      setSelectedOptionIds,
      selectedFeeIds, 
      setSelectedFeeIds,
      selectedStockIds,
      setSelectedStockIds
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

            if (selectedStockIds.length) {
                await Promise.all(
                    selectedStockIds.map(stockId => 
                        axios.delete(`/api/stocks/${stockId}`)
                    )
                );
                setStocks(prevStocks => prevStocks.filter(stock => !selectedStockIds.includes(stock._id)));
                setSelectedStockIds([]);
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
            <OptionsBlock 
                options={options} 
                selectedOptionIds={selectedOptionIds}
                setSelectedOptionIds={setSelectedOptionIds}
            />
            <StocksBlock 
                stocks={stocks}
                selectedStockIds={selectedStockIds}
                setSelectedStockIds={setSelectedStockIds}
            />
            <TransactionsBlock 
                transactions={transactions}
                selectedTransactionIds={selectedTransactionIds} 
                setSelectedTransactionIds={setSelectedTransactionIds}
            />
            <FeesBlock 
                fees={fees} 
                selectedFeeIds={selectedFeeIds}
                setSelectedFeeIds={setSelectedFeeIds}
            />
            <div className={`delete-button-container ${shouldShowDeleteButton ? 'show' : ''}`}>
                <DeleteButton handleDeleteClick={handleDeleteClick} />
            </div>
        </div>
    );
}

export default Ledger;
