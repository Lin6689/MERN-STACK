import { useState, useEffect } from "react";

export default function Cart() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then(r => r.json()).then(setData);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <input placeholder="Search..." onChange={e => setQ(e.target.value)} />
      {q && data.filter(p => p.title.toLowerCase().includes(q.toLowerCase())).map(p => <p key={p.id}>{p.title}</p>)}
    </div>
  );
}