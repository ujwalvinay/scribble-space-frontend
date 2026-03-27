import bgImage from "../assets/bg.png";
import { Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifySignupOtpRequest, resendSignupOtpRequest } from "../services/api";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailParam = searchParams.get("email")?.trim() || "";

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();
    const code = otp.replace(/\D/g, "");
    if (!trimmed || code.length !== 6) {
      setError("Enter your email and a 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const data = await verifySignupOtpRequest({ email: trimmed, otp: code });
      localStorage.setItem("token", data.token);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : null;
      setError(msg || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Enter your email to resend the code.");
      return;
    }
    setLoading(true);
    try {
      await resendSignupOtpRequest({ email: trimmed });
      setResendCooldown(60);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : null;
      setError(msg || "Could not resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="auth-card">
        <p className="text-xs text-indigo-300 bg-white/10 inline-block px-3 py-1 rounded-full mb-4">
          ● VERIFY EMAIL
        </p>

        <h1 className="text-3xl font-semibold text-white mb-2">
          Check your inbox
        </h1>

        <p className="text-gray-400 mb-6">
          We sent a 6-digit code to your email. Enter it below to activate your
          account.
        </p>

        {success && (
          <div className="mb-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-4 py-3 text-sm">
            Verification successful. Redirecting…
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <label className="form-label">EMAIL ADDRESS</label>
          <div className="input-wrapper mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="dev@workspace.io"
              className="input-field"
              autoComplete="email"
            />
            <Mail className="input-icon w-5 h-5" />
          </div>

          <label className="form-label">VERIFICATION CODE</label>
          <div className="input-wrapper mb-4">
            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              type="text"
              inputMode="numeric"
              placeholder="000000"
              className="input-field tracking-[0.4em] font-mono text-lg"
              maxLength={6}
              autoComplete="one-time-code"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn-gradient disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify & continue"}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={handleResend}
            disabled={loading || success || resendCooldown > 0}
            className="text-sm text-indigo-400 hover:text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"}
          </button>
          <Link to="/login" className="text-sm text-gray-400 hover:text-white">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
