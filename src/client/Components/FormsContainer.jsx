import React from 'react';
import TransactionForm from './TransactionForm';
import OptionForm from './OptionForm';
import StockForm from './StockForm';
import ViewButtons from './ViewButtons';

const FormsContainer = (
      { visibleForm, 
        allowed, 
        addTransaction, 
        addOption, 
        addFee,
        addStock, 
        showTransactionForm, 
        showOptionForm,
        showStockForm, 
      }) => {
        
  return (
    <>
      <ViewButtons 
        showTransactionForm={showTransactionForm}
        showOptionForm={showOptionForm}
        showStockForm={showStockForm}
        allowed={allowed}
      />

      <div className={`form-container ${visibleForm === "transaction" && allowed ? "show" : ""}`}>
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <div className={`form-container ${visibleForm === "option" && allowed ? "show" : ""}`}>
        <OptionForm addOption={addOption} addFee={addFee} />
      </div>
      <div className={`form-container ${visibleForm === "stock" && allowed ? "show" : ""}`}>
        <StockForm addStock={addStock} addFee={addFee} />
      </div>
    </>
  )
}

export default FormsContainer