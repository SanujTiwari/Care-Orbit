import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      if (res.data.role === "patient") navigate("/patient");
      else navigate("/doctor");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        {/* Left Side - Form */}
        <div className="auth-form-side">
          <div className="mb-8">
            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Welcome back!</h1>
            <p style={{ fontSize: "1rem" }}>
              Simplify your workflow and boost your productivity with CareOrbit.
            </p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="Email or Username"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <div style={{ position: "relative" }}>
                <input
                  placeholder="Password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <span className="input-icon" style={{ cursor: "pointer" }}>
                  👁️
                </span>
              </div>
            </div>

            <div className="flex-between mb-6" style={{ fontSize: "0.9rem" }}>
              <label className="flex-center" style={{ gap: "0.5rem", margin: 0, cursor: "pointer" }}>
                <input type="checkbox" style={{ width: "auto", margin: 0 }} />
                Remember me
              </label>
              <Link to="#" style={{ color: "var(--text-main)", fontWeight: "600", textDecoration: "underline" }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", borderRadius: "99px", padding: "1rem" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: "2rem", color: "var(--text-secondary)" }}>
            Not a member?{" "}
            <Link to="/register" style={{ color: "#16a34a", fontWeight: "700" }}>
              Register now
            </Link>
          </p>
        </div>

        {/* Right Side - Hero Image */}
        <div className="auth-hero-side auth-hero-image">
          <div className="mb-8">
            {/* Abstract Decorative Circles */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "2px solid #bbf7d0",
              opacity: 0.5
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "10%",
              left: "-20px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#bbf7d0",
              opacity: 0.3
            }}></div>
          </div>

          <img
            src="https://img.freepik.com/free-vector/yoga-concept-illustration_114360-108.jpg?w=740&t=st=1708400000~exp=1708400600~hmac=a1b2c3d4"
            alt="Wellness"
            style={{ width: "80%", maxWidth: "300px", mixBlendMode: "multiply", marginBottom: "2rem" }}
            onError={(e) => e.target.style.display = 'none'}
          />

          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            CareOrbit App
          </h2>
          <p style={{ maxWidth: "250px", margin: "0 auto" }}>
            Make your health management easier and organized.
          </p>

          <div style={{
            marginTop: "2rem",
            background: "white",
            padding: "1rem 2rem",
            borderRadius: "20px",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div className="badge approved">Health</div>
            <div style={{ fontWeight: "700", fontSize: "1.5rem" }}>98%</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Target Reached</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
