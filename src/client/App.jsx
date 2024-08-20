import Ledger from "./Components/Ledger";
import TransactionForm from "./Components/TransactionForm";

function App() {

  return (
    <div className="App">
      <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>
      <div className="flex flex-col mx-2">
        <TransactionForm />
        <Ledger />
      </div>
    </div>
  );
}

export default App;
