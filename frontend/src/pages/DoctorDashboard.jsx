import { useEffect, useState } from "react";
import API from "../utils/api";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  // Calculate stats
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const approvedCount = appointments.filter(a => a.status === 'approved').length;
  const todayCount = appointments.filter(a => a.date === new Date().toISOString().slice(0, 10)).length;

  // Get doctor's name from local storage
  let doctorName = localStorage.getItem("name");
  if (!doctorName || doctorName === "undefined" || doctorName === "null") {
    doctorName = "Doctor";
  }

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setAppointments([]); // Clear list visually before fetching
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      // Don't clear list here, just update
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      alert("Error updating status");
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await API.delete(`/appointments/${id}`);
        setAppointments(prev => prev.filter(a => a._id !== id));
      } catch (error) {
        alert("Error deleting appointment");
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container" style={{ padding: "2rem 1.5rem", paddingBottom: "4rem" }}>

      {/* Welcome Banner */}
      <div
        className="glass-panel animate-fade-in"
        style={{
          padding: "2.5rem",
          marginBottom: "2.5rem",
          background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
          color: "white",
          border: "none",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 className="mb-2" style={{ color: "white", fontSize: "2rem" }}>
            Welcome Back, {doctorName}!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Here is your daily overview and appointment requests.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{pendingCount}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Pending</div>
            </div>
            <div style={{ height: "40px", width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{todayCount}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Today</div>
            </div>
            <div style={{ height: "40px", width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{approvedCount}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Approved</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}></div>
      </div>

      <div className="glass-panel animate-fade-in" style={{ padding: "2rem" }}>
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 className="section-title" style={{ border: "none", padding: 0, margin: 0 }}>View Appointments</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Manage patient bookings and status</p>
          </div>
          <button
            className="btn-secondary"
            onClick={fetchAppointments}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Refreshing..." : "🔄 Refresh"}
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center" style={{ padding: "4rem", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <p>No appointment requests found.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Patient Name</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Date</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Time</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Doctor</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Department</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Status</th>
                  <th style={{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "600" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "1rem", fontWeight: "500", color: "var(--text-main)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: "var(--surface-secondary)", color: "var(--primary)",
                          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"
                        }}>
                          {a.patientName?.charAt(0) || "P"}
                        </div>
                        {a.patientName}
                      </div>
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>{a.date}</td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>
                      <span style={{ background: "var(--surface-secondary)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.85rem" }}>
                        {a.timeSlot}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>{a.doctorName || "N/A"}</td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>{a.department}</td>
                    <td style={{ padding: "1rem" }}>
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        style={{
                          padding: "0.5rem",
                          borderRadius: "8px",
                          border: `1px solid ${a.status === 'approved' ? 'var(--success)' :
                              a.status === 'rejected' ? 'var(--error)' :
                                'var(--warning)'
                            }`,
                          background: "white",
                          color: "var(--text-main)",
                          cursor: "pointer",
                          fontWeight: "500",
                          outline: "none"
                        }}
                      >
                        <option value="pending" disabled hidden>Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button
                        onClick={() => deleteAppointment(a._id)}
                        style={{
                          background: "#fee2e2",
                          color: "#ef4444",
                          border: "none",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.85rem",
                          transition: "all 0.2s"
                        }}
                        className="btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
