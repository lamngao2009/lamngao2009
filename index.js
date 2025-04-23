import { useState } from "react";

const model = (data, last5) => {
  const patterns = {};
  for (let i = 0; i < data.length - 5; i++) {
    const key = data.slice(i, i + 5);
    const next = data[i + 5];
    const pair = key + next;
    patterns[pair] = (patterns[pair] || 0) + 1;
  }
  const tKey = last5 + "T";
  const xKey = last5 + "X";
  const countT = patterns[tKey] || 0;
  const countX = patterns[xKey] || 0;
  if (countT > countX) return "Tài";
  if (countX > countT) return "Xỉu";
  return "Không chắc";
};

const data =
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTXXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = () => {
    const cleanInput = input.trim().toUpperCase();
    if (cleanInput.length !== 5 || /[^TX]/.test(cleanInput)) {
      setResult("Vui lòng nhập đúng 5 ký tự gồm T hoặc X");
      return;
    }
    const prediction = model(data, cleanInput);
    setResult("Dự đoán: " + prediction);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Tool Dự Đoán Tài/Xỉu</h1>
      <input
        type="text"
        placeholder="Nhập 5 kết quả gần nhất (T hoặc X)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
      />
      <button onClick={handlePredict} style={{ padding: 10, width: "100%" }}>
        Dự đoán
      </button>
      <div style={{ marginTop: 20, fontWeight: "bold" }}>{result}</div>
    </div>
  );
}