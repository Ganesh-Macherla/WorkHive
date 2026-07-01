import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Hive() {
  const { id } = useParams();

  const [hive, setHive] = useState(null);

  useEffect(() => {
    const fetchHive = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(`/hives/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHive(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchHive();
  }, [id]);

  if (!hive) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hive Workspace</h1>

      <h2>{hive.name}</h2>

      <p>Room Code: {hive.room_code}</p>

      <p>Hive ID: {hive.id}</p>
    </div>
  );
}

export default Hive;