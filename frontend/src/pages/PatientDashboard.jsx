import { useEffect, useState } from "react";
import API from "../utils/api";
import { DOCTOR_CATEGORIES } from "../constants/doctorCategories";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyTab, setHistoryTab] = useState("upcoming"); // "upcoming" | "history"

  // Get patient's name from local storage
  let patientName = localStorage.getItem("name");
  if (!patientName || patientName === "undefined" || patientName === "null") {
    patientName = "Patient";
  }

  const [form, setForm] = useState({
    department: "",
    doctorName: "",
    patientName: patientName !== "Patient" ? patientName : "", // Auto-fill if available
    date: "",
    timeSlot: "",
  });

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setForm((f) => ({ ...f, department: "", doctorName: "" }));
      return;
    }
    const found = DOCTOR_CATEGORIES.find((c) => c.department === value);
    if (found) {
      setForm((f) => ({ ...f, department: found.department, doctorName: found.doctorName }));
    }
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/appointments", form);
      fetchAppointments();
      setForm({
        department: "",
        doctorName: "",
        patientName: "",
        date: "",
        timeSlot: "",
      });
      // Optionally switch to upcoming tab to show new appointment
      setHistoryTab("upcoming");
    } catch (error) {
      alert("Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  // Ensure we compare strings correctly. If dates are YYYY-MM-DD, string comparison works.
  // But let's be safe.
  const upcoming = appointments.filter((a) => a.date >= today);
  const history = appointments.filter((a) => a.date < today);

  const AppointmentCard = ({ a }) => (
    <div
      className="glass-panel card-hover"
      style={{
        padding: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "var(--surface-secondary)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "700",
            boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.05)"
          }}
        >
          {a.doctorName?.charAt(0) || "?"}
        </div>
        <div>
          <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--text-main)" }}>
            {a.doctorName}
          </div>
          <div style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: "600" }}>
            {a.department}
          </div>
          <div style={{ fontSize: "0.85rem", marginTop: "0.25rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ background: "var(--surface-secondary)", padding: "0.1rem 0.5rem", borderRadius: "4px" }}>📅 {a.date}</span>
            <span style={{ background: "var(--surface-secondary)", padding: "0.1rem 0.5rem", borderRadius: "4px" }}>⏰ {a.timeSlot}</span>
          </div>
        </div>
      </div>
      <span className={`badge ${a.status}`}>
        {a.status?.charAt(0).toUpperCase() + a.status?.slice(1)}
      </span>
    </div>
  );

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
            Welcome Back, {patientName}!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", maxWidth: "600px" }}>
            Manage your appointments and browse our specialist doctors below.
          </p>
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

      <div className="dashboard-grid animate-fade-in">
        {/* Book Appointment Form */}
        <div className="glass-panel" style={{ padding: "2rem", height: "fit-content" }}>
          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <h3 className="section-title" style={{ border: "none", padding: 0, margin: 0 }}>Book Appointment</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Schedule a visit with our specialists</p>
          </div>

          <form onSubmit={bookAppointment} className="grid-layout" style={{ gap: "1.25rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Department / Category</label>
              <select
                value={form.department}
                onChange={handleCategoryChange}
                required
                style={{ cursor: "pointer", width: "100%" }}
              >
                <option value="">Select category</option>
                {DOCTOR_CATEGORIES.map((cat) => (
                  <option key={cat.department} value={cat.department}>
                    {cat.department}
                  </option>
                ))}
              </select>
            </div>

            {form.doctorName && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Selected Doctor</label>
                <div style={{
                  padding: "0.75rem 1rem",
                  background: "var(--surface-secondary)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  color: "var(--text-main)",
                  fontWeight: "500"
                }}>
                  👨‍⚕️ {form.doctorName}
                </div>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Your Name</label>
              <input
                placeholder="Full name"
                value={form.patientName}
                required
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                required
                min={today}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Time Slot</label>
              <select
                value={form.timeSlot}
                onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                required
                style={{ cursor: "pointer", width: "100%" }}
              >
                <option value="">Select time slot</option>
                {[
                  "09:00 AM", "10:00 AM", "11:00 AM",
                  "12:00 PM", "01:00 PM", "02:00 PM",
                  "03:00 PM", "04:00 PM", "05:00 PM",
                ].map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: "0.5rem" }}
              disabled={loading}
            >
              {loading ? "Booking in progress..." : "Confirm Booking"}
            </button>
          </form>
        </div>

        {/* Appointments List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-panel" style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", display: "inline-flex", width: "fit-content", gap: "0.5rem" }}>
            <button
              type="button"
              className={`btn-secondary ${historyTab === "upcoming" ? "active-tab" : ""}`}
              style={{
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: historyTab === "upcoming" ? "var(--surface-secondary)" : "transparent",
                color: historyTab === "upcoming" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: "600",
                boxShadow: "none"
              }}
              onClick={() => setHistoryTab("upcoming")}
            >
              Upcoming ({upcoming.length})
            </button>
            <button
              type="button"
              className={`btn-secondary ${historyTab === "history" ? "active-tab" : ""}`}
              style={{
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: historyTab === "history" ? "var(--surface-secondary)" : "transparent",
                color: historyTab === "history" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: "600",
                boxShadow: "none"
              }}
              onClick={() => setHistoryTab("history")}
            >
              Past History ({history.length})
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {historyTab === "upcoming" && (
              <>
                {upcoming.length === 0 ? (
                  <div className="glass-panel text-center" style={{ padding: "4rem 2rem", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
                    <h3 style={{ marginBottom: "0.5rem", color: "var(--text-main)" }}>No upcoming appointments</h3>
                    <p>Book your first appointment to get started.</p>
                  </div>
                ) : (
                  upcoming.map((a) => <AppointmentCard key={a._id} a={a} />)
                )}
              </>
            )}

            {historyTab === "history" && (
              <>
                {history.length === 0 ? (
                  <div className="glass-panel text-center" style={{ padding: "4rem 2rem", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🕰️</div>
                    <h3 style={{ marginBottom: "0.5rem", color: "var(--text-main)" }}>No booking history</h3>
                    <p>Your past appointments will appear here.</p>
                  </div>
                ) : (
                  history.map((a) => <AppointmentCard key={a._id} a={a} />)
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Meet Our Specialists Section */}
      <div className="glass-panel animate-fade-in" style={{ marginTop: "3rem", padding: "2rem" }}>
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
          <h3 className="section-title" style={{ border: "none", padding: 0, margin: 0 }}>Meet Our Specialists</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Expert doctors available across all departments</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {DOCTOR_CATEGORIES.map((doc, index) => (
            <div
              key={index}
              className="card-hover"
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "1.5rem",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, var(--primary), var(--secondary))"
              }}></div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "var(--surface-secondary)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold"
                }}>
                  {doc.doctorName.charAt(4)}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "var(--text-main)", fontSize: "1.05rem" }}>
                    {doc.doctorName}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: "500" }}>
                    {doc.department}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
