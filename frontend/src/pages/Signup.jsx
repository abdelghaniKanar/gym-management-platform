import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );
      login(response.data.user, response.data.token); // Use login from AuthContext
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign Up
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
