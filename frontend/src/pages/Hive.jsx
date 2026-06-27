import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hive() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (!token) {
      console.log("NO TOKEN FOUND");
      navigate("/");
    }

  }, []);

  return (
    <div>
      <h1>Hive Page</h1>
    </div>
  );
}

export default Hive;