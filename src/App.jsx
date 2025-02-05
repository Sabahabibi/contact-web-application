import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./pages/home";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <HomePage />{" "}
    </div>
  );
}

export default App;
