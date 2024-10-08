import { useState, useEffect } from "react";
import Ledger from "./Components/Ledger";
import { CircleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import FormsContainer from "./Components/FormsContainer";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function App() {

  const [visibleForm, setVisibleForm] = useState(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [selectedFeeIds, setSelectedFeeIds] = useState([]);
  const [selectedStockIds, setSelectedStockIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fees, setFees] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allowed = !selectedTransactionIds.length && !selectedOptionIds.length && !selectedFeeIds.length;

  const showTransactionForm = () => visibleForm !== 'transaction' ? setVisibleForm('transaction') : setVisibleForm(null);
  const showOptionForm = () => visibleForm !== 'option' ? setVisibleForm('option') : setVisibleForm(null);
  const showStockForm = () => visibleForm !== 'stock' ? setVisibleForm('stock') : setVisibleForm(null);

  const addOption = (newOption) => {
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const addFee = (newFee) => {
    setFees((prevFees) => [...prevFees, newFee]);
  }

  const addStock = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  }

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
    const fetchFees = async () => {
      try {
        const response = await axios.get('/api/fees');
        setFees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching fees');
        setLoading(false);
      }
    }
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/api/stocks');
        setStocks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching stocks');
        setLoading(false);
      }
    }
    fetchOptions();
    fetchTransactions();
    fetchFees();
    fetchStocks();
}, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>

      <div className="flex flex-col mx-2">
        <FormsContainer 
          visibleForm={visibleForm}
          allowed={allowed}
          addOption={addOption}
          addTransaction={addTransaction}
          addFee={addFee}
          addStock={addStock}
          selectedOptionIds={selectedOptionIds}
          selectedTransactionIds={selectedTransactionIds}
          selectedStockIds={selectedStockIds}
          showOptionForm={showOptionForm}
          showTransactionForm={showTransactionForm}
          showStockForm={showStockForm}
        />

        {loading ? 
        <div className="flex justify-center items-center h-[75vh]">
          <CircleLoader color={'white'} />
        </div>
        :
        <Ledger
          setSelectedTransactionIds={setSelectedTransactionIds}
          selectedTransactionIds={selectedTransactionIds}
          setSelectedOptionIds={setSelectedOptionIds}
          selectedOptionIds={selectedOptionIds}
          setSelectedFeeIds={setSelectedFeeIds}
          selectedFeeIds={selectedFeeIds}
          setSelectedStockIds={setSelectedStockIds}
          selectedStockIds={selectedStockIds}
          fees={fees}
          options={options}
          transactions={transactions}
          stocks={stocks}
          setOptions={setOptions}
          setTransactions={setTransactions}
          setFees={setFees}
          setStocks={setStocks}
        />
      }
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
