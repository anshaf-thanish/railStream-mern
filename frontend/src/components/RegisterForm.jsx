import { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerUser(form);

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      // Switch to login form after successful registration
      onSwitch();

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
    >
      <h2 className="text-3xl font-bold text-center text-white">
        Create Account
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      <p className="text-center text-gray-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-400 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;