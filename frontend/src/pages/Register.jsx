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

                <h1 className="text-3xl font-bold text-center">
                    DocChatAI
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Create your account
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium">
                            Name
                        </label>

                        <Input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button type="submit">
                        Register
                    </Button>

                </form>

                <p className="mt-6 text-center text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </Card>
        </AuthLayout>
    );
}

export default Register;