import { useState, useEffect } from "react";
import Ledger from "./Components/Ledger";
import OptionForm from "./Components/OptionForm";
import TransactionForm from "./Components/TransactionForm";
import ViewButtons from "./Components/ViewButtons";
import { CircleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function App() {

  const [visibleForm, setVisibleForm] = useState(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allowed = !selectedTransactionIds.length && !selectedOptionIds.length;

  const showTransactionForm = () => visibleForm !== 'transaction' ? setVisibleForm('transaction') : setVisibleForm(null);
  const showOptionForm = () => visibleForm !== 'option' ? setVisibleForm('option') : setVisibleForm(null);

  const addOption = (newOption) => {
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

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

  if (error) {
    return <div>{error}</div>;
  }

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
          <TransactionForm addTransaction={addTransaction} />
        </div>
        <div className={`form-container ${visibleForm === "option" && allowed ? "show" : ""}`}>
          <OptionForm addOption={addOption} />
        </div>
        {loading ? 
        <CircleLoader color={'white'} />
        :
        <Ledger
          setSelectedTransactionIds={setSelectedTransactionIds}
          selectedTransactionIds={selectedTransactionIds}
          setSelectedOptionIds={setSelectedOptionIds}
          selectedOptionIds={selectedOptionIds}
          options={options}
          transactions={transactions}
          setOptions={setOptions}
          setTransactions={setTransactions}
        />
      }
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
