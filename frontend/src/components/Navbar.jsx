import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="glass-panel" style={{
      width: "100%",
      marginTop: "0",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: "0",
      zIndex: 1000,
      borderRadius: "0", // Full width usually implies no rounded corners at top/sides or just rectangular
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      borderBottom: "1px solid rgba(0,0,0,0.05)"
    }}>
      {/* Brand / Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, var(--primary), #0d9488)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "bold"
        }}>
          C
        </div>
        <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.5px" }}>
          Care<span style={{ color: "var(--primary)" }}>Orbit</span>
        </span>
      </Link>

      {/* Center Navigation - Standard Website Links */}
      <div className="flex-center desktop-nav" style={{ gap: "2.5rem", display: "flex" }}>
        <Link to="/" className="nav-link" style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)" }}>Home</Link>
        {/* Using # for demo links as requested to look like a real website */}
        <span className="nav-link" style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>Find Doctors</span>
        <span className="nav-link" style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>Hospitals</span>
        <span className="nav-link" style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>About Us</span>
      </div>

      {/* Right Side Actions */}
      <div className="flex-center desktop-actions" style={{ gap: "1rem" }}>
        {role ? (
          <>


            {role === "patient" && (
              <Link to="/patient" className="btn-secondary" style={{ borderRadius: "99px", padding: "0.5rem 1.25rem", fontSize: "0.9rem", border: "none", boxShadow: "none", background: "transparent" }}>
                Dashboard
              </Link>
            )}
            {role === "doctor" && (
              <Link to="/doctor" className="btn-secondary" style={{ borderRadius: "99px", padding: "0.5rem 1.25rem", fontSize: "0.9rem", border: "none", boxShadow: "none", background: "transparent" }}>
                Portal
              </Link>
            )}

            <button
              onClick={logout}
              className="btn-primary"
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "0.9rem",
                borderRadius: "99px",
                background: "black"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowLoginPopup(!showLoginPopup)}
              className="btn-primary"
              style={{
                padding: "0.75rem 2rem",
                fontSize: "0.95rem",
                borderRadius: "99px",
              }}
            >
              Book Appointment
            </div>

            {showLoginPopup && (
              <div style={{
                position: "absolute",
                top: "125%",
                right: "0",
                width: "320px",
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.05)",
                zIndex: 1000,
                transformOrigin: "top right",
                animation: "fadeIn 0.2s ease-out"
              }} onClick={(e) => e.stopPropagation()}>
                <div style={{ textAlign: "center" }}>
                  <h3 style={{
                    marginBottom: "0.5rem",
                    color: "#ef4444",
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}>
                    <span>⚠️</span> Login Required
                  </h3>
                  <p style={{
                    marginBottom: "1.5rem",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5"
                  }}>
                    Please login or create an account to book an appointment.
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                    <button
                      onClick={() => setShowLoginPopup(false)}
                      style={{
                        padding: "0.6rem 1.25rem",
                        background: "var(--surface-secondary)",
                        border: "none",
                        borderRadius: "99px",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowLoginPopup(false);
                        navigate("/login");
                      }}
                      style={{
                        padding: "0.6rem 1.25rem",
                        background: "#ef4444",
                        border: "none",
                        borderRadius: "99px",
                        fontWeight: "600",
                        color: "white",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                      }}
                    >
                      Login / Signup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <span style={{ fontSize: "1.5rem", cursor: "pointer" }}>☰</span>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          background: "white",
          padding: "2rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          display: "flex", // Keep as flex to stack items
          flexDirection: "column",
          gap: "1.5rem",
          zIndex: 999,
          borderTop: "1px solid var(--border)"
        }}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-secondary)" }}>Home</Link>
          <span onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>Find Doctors</span>
          <span onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>Hospitals</span>
          <span onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer" }}>About Us</span>

          <div style={{ height: "1px", background: "var(--border)" }}></div>

          {role ? (
            <button
              onClick={() => { logout(); setIsMobileMenuOpen(false); }}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => { setShowLoginPopup(true); setIsMobileMenuOpen(false); }}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Book Appointment
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
