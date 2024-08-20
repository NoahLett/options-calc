import { useState } from "react";
import Ledger from "./Components/Ledger";
import OptionForm from "./Components/OptionForm";
import TransactionForm from "./Components/TransactionForm";

function App() {

  const [visibleForm, setVisibleForm] = useState(null);

  const showTransactionForm = () => visibleForm !== 'transaction' ? setVisibleForm('transaction') : setVisibleForm(null);
  const showOptionForm = () => visibleForm !== 'option' ? setVisibleForm('option') : setVisibleForm(null);

  return (
    <div className="App">
      <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>

      <div className="flex justify-around my-4">
        <button
          className=" bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={showTransactionForm}
        >
          New Transaction
        </button>
        <button
          className=" bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={showOptionForm}
        >
          New Option
        </button>
      </div>

      <div className="flex flex-col mx-2">
        <div className={`form-container ${visibleForm === "transaction" ? "show" : ""}`}>
          <TransactionForm />
        </div>
        <div className={`form-container ${visibleForm === "option" ? "show" : ""}`}>
          <OptionForm />
        </div>
        <Ledger />
      </div>
    </div>
  );
}

export default App;
