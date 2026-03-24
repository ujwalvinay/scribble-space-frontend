import bgImage from "../assets/bg.png";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    email: email.trim(),
    password: password.trim(),
  };

  try {
    await signupUser(payload);

    // Redirect to login
    navigate("/login");
  } catch (error: any) {
    console.log(error.response?.data || error.message);
  }
};

  const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
      <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
      <div className="auth-card">
          <p className="text-xs text-indigo-300 bg-white/10 inline-block px-3 py-1 rounded-full mb-4">
            ● THE DIGITAL CURATOR
          </p>

          <h1 className="text-3xl font-semibold text-white mb-2">
            Build your space.
          </h1>

          <p className="text-gray-400 mb-6">
            Join the ecosystem for high-end modern engineering.
          </p>
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
            <form onSubmit={handleSignup}>
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
                <button className="btn-gradient">
                    Continue
                </button>
            </form>

                {/* FOOTER */}
                <p className="text-center text-gray-400 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/login" className="text-indigo-400">
                    Log In
                    </Link>
                </p>

      </div>
  </div>
  )
}

export default Signup;