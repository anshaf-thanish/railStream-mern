import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const LoginForm = ({ onSwitch }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-8 rounded-lg w-full max-w-md space-y-4"
    >
      <h2 className="text-3xl font-bold text-center">
        Login
      </h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 rounded bg-zinc-800"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 rounded bg-zinc-800"
        required
      />

      <button
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center">
        Don't have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-400 ml-2"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;