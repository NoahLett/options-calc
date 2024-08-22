import React from 'react';
import TransactionForm from './TransactionForm';
import OptionForm from './OptionForm';
import ViewButtons from './ViewButtons';

const FormsContainer = ({ visibleForm, allowed, addTransaction, addOption, addFee, selectedOptionIds, selectedTransactionIds, showTransactionForm, showOptionForm }) => {
  return (
    <>
      <ViewButtons 
        selectedOptionIds={selectedOptionIds}
        selectedTransactionIds={selectedTransactionIds}
        showTransactionForm={showTransactionForm}
        showOptionForm={showOptionForm}
        allowed={allowed}
      />

      <div className={`form-container ${visibleForm === "transaction" && allowed ? "show" : ""}`}>
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <div className={`form-container ${visibleForm === "option" && allowed ? "show" : ""}`}>
        <OptionForm addOption={addOption} addFee={addFee} />
      </div>
    </>
  )
}

export default FormsContainer