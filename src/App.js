import { useState } from "react";
import Login from "./pages/Login";
import Kos from "./pages/Kos";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Kos />;
}

export default App;
