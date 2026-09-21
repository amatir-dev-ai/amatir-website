// src/pages/AdmissionsRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdmissionsRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/reachout", { replace: true });
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        fontWeight: "500",
      }}
    >
      Redirecting to Reach Out...
    </div>
  );
}
