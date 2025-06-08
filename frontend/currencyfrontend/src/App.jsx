import React, { useEffect, useState } from "react";

function App() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [rate, setRate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/api/currencyo";

  useEffect(() => {
    fetchPairs();
  }, []);

  function fetchPairs() {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch currency pairs");
        return res.json();
      })
      .then((data) => {
        setPairs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  function resetForm() {
    setBaseCurrency("");
    setTargetCurrency("");
    setRate("");
    setEditingId(null);
  }

  // Create or Update handler
  function handleSubmit(e) {
    e.preventDefault();
    const pairData = { baseCurrency, targetCurrency, rate: parseFloat(rate) };

    if (!baseCurrency || !targetCurrency || !rate) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId === null) {
      // CREATE
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pairData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to create pair");
          return res.json();
        })
        .then(() => {
          fetchPairs();
          resetForm();
        })
        .catch((err) => setError(err.message));
    } else {
      // UPDATE
      fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pairData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update pair");
          return res.json();
        })
        .then(() => {
          fetchPairs();
          resetForm();
        })
        .catch((err) => setError(err.message));
    }
  }

  // Delete handler
  function handleDelete(id) {
    if (!window.confirm("Delete this currency pair?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete pair");
        fetchPairs();
      })
      .catch((err) => setError(err.message));
  }

  // Edit button handler
  function handleEdit(pair) {
    setBaseCurrency(pair.baseCurrency);
    setTargetCurrency(pair.targetCurrency);
    setRate(pair.rate.toString());
    setEditingId(pair.id);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: 30,
        boxSizing: "border-box",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f7f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <h1 style={{ color: "#003366", marginBottom: 20 }}>
        Currency Exchange 
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 30,
          width: "100%",
          maxWidth: 900,
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Base Currency (e.g. USD)"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
          style={{ padding: 10, flex: "1 1 150px", maxWidth: 150 }}
          maxLength={3}
          required
        />
        <input
          type="text"
          placeholder="Target Currency (e.g. INR)"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
          style={{ padding: 10, flex: "1 1 150px", maxWidth: 150 }}
          maxLength={3}
          required
        />
        <input
          type="number"
          step="0.0001"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{ padding: 10, flex: "1 1 120px", maxWidth: 120 }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0052cc",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            flex: "1 1 120px",
            maxWidth: 120,
          }}
        >
          {editingId === null ? "Add" : "Update"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              padding: "10px 20px",
              backgroundColor: "#999",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              flex: "1 1 120px",
              maxWidth: 120,
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Error message */}
      {error && (
        <p style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* Loading & List */}
      {loading ? (
        <p>Loading currency pairs...</p>
      ) : pairs.length === 0 ? (
        <p>No currency pairs found.</p>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#003366", color: "white" }}>
                <th style={{ padding: 12 }}>Base Currency</th>
                <th style={{ padding: 12 }}>Target Currency</th>
                <th style={{ padding: 12 }}>Rate</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair) => (
                <tr
                  key={pair.id}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={{ padding: 12 }}>{pair.baseCurrency}</td>
                  <td style={{ padding: 12 }}>{pair.targetCurrency}</td>
                  <td style={{ padding: 12 }}>{pair.rate}</td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => handleEdit(pair)}
                      style={{
                        marginRight: 10,
                        padding: "6px 12px",
                        backgroundColor: "#0052cc",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pair.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#cc0000",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
