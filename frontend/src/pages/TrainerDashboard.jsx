import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function TrainerDashboard() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    maxCapacity: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const createSession = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/sessions", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSessions(); // Refresh list
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSessions(); // Refresh list
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>

      <form onSubmit={createSession} className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Create a New Session</h3>
        <input
          type="date"
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="date"
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Max Capacity"
          onChange={(e) =>
            setFormData({ ...formData, maxCapacity: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default TrainerDashboard;
