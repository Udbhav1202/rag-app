import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("auth", JSON.stringify(data));

      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.detail || "Unable to connect to the server.");

      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="mb-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9974b]">
            Vol. I
          </span>
          <h1 className="font-display mt-2 text-4xl font-semibold text-[#ede4d3]">
            DocChatAI
          </h1>
          <p className="mt-2 text-sm text-[#a69c89]">
            Chat with your documents using AI
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-[#a69c89]">
              Email
            </label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-[#a69c89]">
              Password
            </label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit">Enter</Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6f6656]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#c9974b] hover:text-[#e3b463]">
            Register
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}

export default Login;
