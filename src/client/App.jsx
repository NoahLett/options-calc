import { useState } from "react";
import Ledger from "./Components/Ledger";
import OptionForm from "./Components/OptionForm";
import TransactionForm from "./Components/TransactionForm";
import ViewButtons from "./Components/ViewButtons";

function App() {

  const [visibleForm, setVisibleForm] = useState(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);

  const allowed = !selectedTransactionIds.length && !selectedOptionIds.length;

  const showTransactionForm = () => visibleForm !== 'transaction' ? setVisibleForm('transaction') : setVisibleForm(null);
  const showOptionForm = () => visibleForm !== 'option' ? setVisibleForm('option') : setVisibleForm(null);

  return (
    <div className="App">
      <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>

      <ViewButtons 
        selectedOptionIds={selectedOptionIds}
        selectedTransactionIds={selectedTransactionIds}
        showTransactionForm={showTransactionForm}
        showOptionForm={showOptionForm}
        allowed={allowed}
      />

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
          setSelectedOptionIds={setSelectedOptionIds}
          selectedOptionIds={selectedOptionIds}
        />
      </div>
    </div>
  );
}

export default App;
