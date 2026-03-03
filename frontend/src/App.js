import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);

  //themes
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    background: darkMode ? "#1e1e1e" : "#f5f5f5",
    text: darkMode ? "#ffffff" : "#111111",
    card: darkMode ? "#2a2a2a" : "#ffffff",
    border: darkMode ? "#3a3a3a" : "#cccccc",
    inputBg: darkMode ? "#333" : "#ffffff",
    inputText: darkMode ? "#fff" : "#111",
    faqBg: darkMode ? "#2d2d2d" : "#ffffff",
    buttonPrimary: "#007bff",
    subText: darkMode ? "#bbbbbb" : "#555555"
  };

  // update page background
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#e9e9e9";
  }, [darkMode]);

  //location button and geocoding translation
  const fillWithLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude},${longitude}`;

        try {
          const response = await axios.post("http://localhost:5000/api/reverse", {
            coords,
          });

          setOrigin(response.data.address);
        } catch {
          alert("Could not convert your location into an address.");
        }
      },
      () => {
        alert("Location access denied.");
      }
    );
  };

  // travel time format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (hrs > 0) return `${hrs} hr ${mins} min`;
    return `${mins} min`;
  };

  // request sender
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/commute", {
        origin,
        destination,
      });

      setResult(response.data);
    } catch {
      setError("Error retrieving commute data.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "50px auto",
        fontFamily: "Inter, Arial",
        padding: 20,
        background: theme.background,
        color: theme.text,
        minHeight: "100vh",
        transition: "0.3s ease",
      }}
    >
      {/* header/dark mode toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>Rate My Commute</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            background: darkMode ? "#444" : "#ddd",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            color: darkMode ? "#fff" : "#111",
            fontWeight: 600,
            height: 38,
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <h3 style={{ marginTop: -10, marginBottom: 25, color: theme.subText }}>
        A powerful app to quickly calculate your commute specifics.
      </h3>

      {/* input card */}
      <div
        style={{
          background: theme.card,
          padding: 20,
          borderRadius: 12,
          boxShadow: darkMode
            ? "0 4px 16px rgba(0,0,0,0.4)"
            : "0 4px 12px rgba(0,0,0,0.1)",
          border: `1px solid ${theme.border}`,
        }}
      >
        {/* origin box */}
        <label style={{ fontWeight: 600 }}>Origin Address</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="123 Main St, New York NY"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: `1px solid ${theme.border}`,
            marginTop: 6,
            marginBottom: 10,
            background: theme.inputBg,
            color: theme.inputText,
          }}
        />

        <button
          onClick={fillWithLocation}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          Use My Location
        </button>

        {/* destination box */}
        <label style={{ fontWeight: 600 }}>Destination Address</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Times Square, NYC"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: `1px solid ${theme.border}`,
            marginTop: 6,
            marginBottom: 20,
            background: theme.inputBg,
            color: theme.inputText,
          }}
        />

        {/* submit */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: theme.buttonPrimary,
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Check Commute
        </button>
      </div>

      {/* loading/error */}
      {loading && <p style={{ marginTop: 20 }}>Loading...</p>}
      {error && (
        <p style={{ color: "red", marginTop: 20, fontWeight: 600 }}>{error}</p>
      )}

      {/* results */}
      {result && (
        <div
          style={{
            marginTop: 25,
            background: theme.card,
            padding: 20,
            borderRadius: 12,
            boxShadow: darkMode
              ? "0 4px 16px rgba(0,0,0,0.4)"
              : "0 4px 12px rgba(0,0,0,0.1)",
            border: `1px solid ${theme.border}`,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Commute Results</h2>

          <p><b>Travel Time:</b> {formatTime(result.travel_time)}</p>
          <p><b>Delay:</b> {result.delay} sec</p>
          <p><b>Traffic Incidents:</b> {result.incident_count}</p>

          <div
            style={{
              marginTop: 15,
              padding: 15,
              background: darkMode ? "#00337e" : "#f4f7ff",
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0, fontSize: 38, color: darkMode ? "#7ab4ff" : "#0056d6" }}>
              {result.rating}/100
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: theme.subText }}>
              Commute Rating
            </p>
          </div>
        </div>
      )}

      {/* faq/dropdown */}
      <div style={{ marginTop: 35 }}>
        <button
          onClick={() => setShowFAQ(!showFAQ)}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            cursor: "pointer",
            textAlign: "left",
            fontSize: 15,
            fontWeight: 600,
            color: theme.text,
          }}
        >
          {showFAQ ? "▼ What does the commute rating mean?" : "► What does the commute rating mean?"}
        </button>

        {showFAQ && (
          <div
            style={{
              padding: 15,
              border: `1px solid ${theme.border}`,
              borderRadius: "0 0 8px 8px",
              borderTop: "none",
              background: theme.faqBg,
            }}
          >
            <p><b>Rating:</b> A 0-100 score based on trip length, traffic delay, and incidents.</p>
            <p><b>Travel Time:</b> How long your trip takes with real-time traffic.</p>
            <p><b>Delay:</b> Extra minutes added due to congestion.</p>
            <p><b>Incidents:</b> Traffic events on your route like crashes or closures..</p>
          </div>
        )}
      </div>

      {/* footer */}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          color: theme.subText,
          fontSize: 13,
          paddingBottom: 30,
        }}
      >
        © 2025 RateMyCommute. Built with React & Flask. GitHub: mbarberdev
      </div>
    </div>
  );
}

export default App;
