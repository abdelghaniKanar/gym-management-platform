import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Gym Manager
      </Link>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user.role === "trainer" ? (
              <Link to="/trainer/dashboard" className="hover:text-gray-300">
                Trainer Dashboard
              </Link>
            ) : (
              <Link to="/member/dashboard" className="hover:text-gray-300">
                Member Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
