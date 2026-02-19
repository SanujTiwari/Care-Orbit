import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        {/* Left Side - Form */}
        <div className="auth-form-side">
          <div className="mb-6">
            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Create Account</h1>
            <p style={{ fontSize: "1rem" }}>
              Join CareOrbit today to manage your appointments efficiently.
            </p>
          </div>

          {error && <div className="error-message"><span>⚠️</span> {error}</div>}

          {success && (
            <div style={{
              background: "#ecfdf5", color: "#065f46", padding: "1rem",
              borderRadius: "var(--radius-md)", marginBottom: "1.5rem",
              border: "1px solid #d1fae5", display: "flex", alignItems: "center", gap: "0.5rem"
            }}>
              <span>✅</span> Account created! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="Full Name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Email Address"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label style={{ marginLeft: "0.5rem", marginBottom: "0.75rem" }}>I am a:</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "patient" })}
                  className={form.role === "patient" ? "btn-primary" : "btn-secondary"}
                  style={{ flex: 1, borderRadius: "99px", padding: "0.75rem" }}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "doctor" })}
                  className={form.role === "doctor" ? "btn-primary" : "btn-secondary"}
                  style={{ flex: 1, borderRadius: "99px", padding: "0.75rem" }}
                >
                  Doctor
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: "1rem", borderRadius: "99px", padding: "1rem" }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: "2rem", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#16a34a", fontWeight: "700" }}>
              Login here
            </Link>
          </p>
        </div>

        {/* Right Side - Hero Image */}
        <div className="auth-hero-side auth-hero-image" style={{ background: "#eff6ff" }}>
          <div className="mb-8">
            {/* Abstract Decorative Circles - Blue Theme */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              border: "2px solid #bfdbfe",
              opacity: 0.5
            }}></div>
          </div>

          <img
            src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg?w=740"
            alt="Medical Team"
            style={{ width: "90%", maxWidth: "320px", mixBlendMode: "multiply", marginBottom: "2rem" }}
            onError={(e) => e.target.style.display = 'none'}
          />

          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Professional Care
          </h2>
          <p style={{ maxWidth: "250px", margin: "0 auto" }}>
            Connect with top specialists and manage your health journey.
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
            <div className="badge" style={{ background: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe" }}>Doctors</div>
            <div style={{ fontWeight: "700", fontSize: "1.5rem" }}>50+</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Specialists</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
