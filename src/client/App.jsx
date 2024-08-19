import Ledger from "./Components/Ledger";

function App() {

  return (
    <div className="App">
      <div className="flex flex-col">
        <h1 className="font-semibold text-4xl m-5">OptiCalc</h1>
          <Ledger />
      </div>
    </div>
  );
}

export default App;
