import { useState } from "react";
import Ledger from "./Components/Ledger";
import OptionForm from "./Components/OptionForm";
import TransactionForm from "./Components/TransactionForm";

function App() {

  const [visibleForm, setVisibleForm] = useState(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);

  const allowed = !selectedTransactionIds.length;

  const showTransactionForm = () => visibleForm !== 'transaction' ? setVisibleForm('transaction') : setVisibleForm(null);
  const showOptionForm = () => visibleForm !== 'option' ? setVisibleForm('option') : setVisibleForm(null);

  return (
    <div className="App">
      <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>

      <div className="flex justify-around my-4">
        <button
          className={`text-white py-2 px-3 rounded-md ${!allowed ? 'bg-slate-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={showTransactionForm}
          disabled={selectedTransactionIds.length > 0}
        >
          New Transaction
        </button>
        <button
          className={`text-white py-2 px-3 rounded-md ${!allowed ? 'bg-slate-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={showOptionForm}
          disabled={selectedTransactionIds.length > 0}
        >
          New Option
        </button>
      </div>

      <div className="flex flex-col mx-2">
        <div className={`form-container ${visibleForm === "transaction" && allowed ? "show" : ""}`}>
          <TransactionForm />
        </div>
        <div className={`form-container ${visibleForm === "option" && allowed ? "show" : ""}`}>
          <OptionForm />
        </div>
        <Ledger
          setSelectedTransactionIds={setSelectedTransactionIds}
          selectedTransactionIds={selectedTransactionIds}
        />
      </div>
    </div>
  );
}

export default App;
