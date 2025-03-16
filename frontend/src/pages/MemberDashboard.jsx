import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function MemberDashboard() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
    fetchBookedSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sessions");
      setSessions(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchBookedSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/sessions/booked", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedSessions(res.data);
    } catch (error) {
      console.error("Error fetching booked sessions:", error);
    }
  };

  const bookSession = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/sessions/${sessionId}/book`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookedSessions(); // Refresh booked sessions
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  const cancelBooking 
