import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

import { register } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="mb-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9974b]">
            New reader
          </span>
          <h1 className="font-display mt-2 text-4xl font-semibold text-[#ede4d3]">
            DocChatAI
          </h1>
          <p className="mt-2 text-sm text-[#a69c89]">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-[#a69c89]">
              Name
            </label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <Button type="submit">Register</Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6f6656]">
          Already have an account?{" "}
          <Link to="/" className="text-[#c9974b] hover:text-[#e3b463]">
            Login
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}

export default Register;
