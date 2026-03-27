import bgImage from "../assets/bg.png";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email: email.trim(),
            password: password.trim(),
        };

        console.log("Sending:", payload);

        try {
            const data = await loginUser(payload);

            console.log("Response:", data);

            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error: unknown) {
            const ax = error as { response?: { data?: unknown } };
            console.log("ERROR FULL:", error);
            console.log("ERROR DATA:", ax.response?.data);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePassword = () => {
        setShowPassword((prev) => !prev);}
  return (
    <>
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="py-12 px-6 rounded-lg bg-[#0F1930] auth-card ">
  
            <div className="glass-card glow-indigo">
                
                <h1 className="text-white text-3xl font-bold mb-2">
                    Welcome back
                </h1>
                <p className="text-white opacity-50 mb-4">Access your secure developer workspace and <br /> continue where you left of.</p>
                <div className=" w-full flex items-center gap-6">
                    <button className="bg-[#192540] glass-card text-white px-8 py-3 rounded-3xl flex gap-3 items-center">
                        <img src="https://cdn.simpleicons.org/google/white" className="w-4 h-4 font-bold" />
                        Google
                    </button>
                    <button className="bg-[#192540] glass-card text-white px-8 py-3 rounded-3xl flex gap-3 items-center">
                        <img src="https://cdn.simpleicons.org/github/white" className="w-4 h-4 font-bold" />
                        Github
                    </button>
                </div>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-white/20"></div>
                    
                    <span className="mx-4 text-xs text-gray-400 tracking-widest">
                        OR WITH EMAIL
                    </span>
                    
                    <div className="flex-grow h-px bg-white/20"></div>
                </div>
                <form onSubmit={handleLogin}>

               <label className="form-label">EMAIL ADDRESS</label>
                <div className="input-wrapper mb-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="dev@workspace.io"
                        className="input-field"
                    />
                    <Mail className="input-icon w-5 h-5" />
                </div>

                {/* PASSWORD HEADER */}
                <div className="flex justify-between items-center mb-2">
                    <label className="form-label mb-0">PASSWORD</label>
                    <span className="text-xs text-indigo-400 cursor-pointer">
                    Forgot password?
                    </span>
                </div>

                {/* PASSWORD INPUT */}
                <div className="input-wrapper">
                    <input
                    value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input-field"
                    />
                    <button type="button" onClick={togglePassword}>
                        {showPassword ? (
                        <EyeOff className="input-icon w-5 h-5" />
                        ) : (
                        <Eye className="input-icon w-5 h-5" />
                        )}
                  </button>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={!email || !password}
                    className="btn-gradient disabled:opacity-50"
                >
                    Continue
                </button>

                {/* FOOTER */}
                <p className="text-center text-gray-400 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-indigo-400">
                    Sign up
                    </Link>
                </p>

                </form>
            </div>

            </div>
        </div>
    </>
  )
}

export default Login;