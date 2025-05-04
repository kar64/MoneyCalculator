// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [start, setStart] = useState(100);
  const [inp, setInp] = useState("USD");
  const [exp, setExp] = useState("EUR");
  const [res, setRes] = useState(10);

  useEffect(() => {
    if (inp === exp || !start) return;
    const convert = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${start}&from=${inp}&to=${exp}`
      );
      const data = await res.json();
      setRes(data.rates[exp]);
    };
    convert();
  }, [inp, exp, start]);

  return (
    <div>
      <input
        type="number"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <select onChange={(e) => setInp(e.target.value)} value={inp}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <span> ➡️ </span>
      <select onChange={(e) => setExp(e.target.value)} value={exp}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {(start&&inp !== exp )&& <p>{res}</p>}
    </div>
  );
}
