import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [customerRate, setCustomerRate] = useState(0);
  const [friendRate, setFriendRate] = useState(0);

  function handleReset() {
    setBill(0);
    setCustomerRate(0);
    setFriendRate(0);
  }

  return (
    <div className="App">
      <InputBill bill={bill} onInputBill={setBill} />
      <br />
      <RateService rate={customerRate} onRate={setCustomerRate}>
        How did you like the service?{" "}
      </RateService>
      <br />
      <RateService rate={friendRate} onRate={setFriendRate}>
        How did your friend like the service?{" "}
      </RateService>
      <br />
      <TotalPay bill={bill} averageRate={(customerRate + friendRate) / 2} />
      {(bill !== 0 || customerRate !== 0 || friendRate !== 0) && (
        <Reset onReset={handleReset} />
      )}
    </div>
  );
}

function InputBill({ bill, onInputBill }) {
  return (
    <div>
      <span>How much was the bill? </span>
      <input
        type="text"
        value={bill}
        onChange={(e) => onInputBill(Number(e.target.value))}
      />
    </div>
  );
}

function RateService({ children, rate, onRate }) {
  return (
    <div>
      {children}
      <select value={rate} onChange={(e) => onRate(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function TotalPay({ bill, averageRate }) {
  const tip = bill * (averageRate / 100);
  const totalBill = bill + tip;
  return (
    bill > 0 && (
      <p>
        <strong>
          You pay ${totalBill} (${bill} + ${tip} tip)
        </strong>
      </p>
    )
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
