import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admissions2526() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to Reachout page
    navigate("/reachout");
  }, [navigate]);

  return (
    <div>
      <h2>Redirecting to Reachout page...</h2>
    </div>
  );
}

export default Admissions2526;
