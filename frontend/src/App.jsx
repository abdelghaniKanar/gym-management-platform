import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MemberDashboard from "./pages/MemberDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
