import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login button clicked");
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    localStorage.setItem(
      "username",
      response.data.username
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: response.data.id,
        username: response.data.username
      })
    );

    navigate("/dashboard");

  } catch (error) {
    console.log(error);
    console.log(error.response);
    alert(JSON.stringify(error.response?.data));
  }
};

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-violet-950/50 p-10">

            <div className="text-center mb-8">

                <h1 className="text-5xl font-bold text-white">

                    WorkHive

                </h1>

                <p className="text-slate-400 mt-3">

                    Time to lock in.

                </p>

            </div>

            <div className="space-y-5">

                <div>

                    <label className="block text-slate-300 mb-2">

                        Email

                    </label>

                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">

                        Password

                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition"
                    />

                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition duration-300"
                >

                    Login

                </button>

            </div>

            <div className="text-center mt-8">

                <p className="text-slate-400">

                    Don't have an account?

                </p>

                <button
                    onClick={() => navigate("/register")}
                    className="text-violet-400 hover:text-violet-300 mt-2"
                >

                    Create an account

                </button>

            </div>

        </div>

    </div>
);
}

export default Login;