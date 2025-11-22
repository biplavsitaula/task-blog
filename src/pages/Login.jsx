import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            if (res) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex px-3 items-center justify-center min-h-screen ">
            <div className="post-card w-full max-w-sm p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1 ">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="shyam"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 ">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="•••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-black text-white p-3 rounded-lg font-medium transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 ">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
