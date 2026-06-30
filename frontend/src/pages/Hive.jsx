import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Hive() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateHive = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/hives",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response);
  }
};

  return (
    <div>
      <h1>Create Hive</h1>

      <br />

      <input
        type="text"
        placeholder="Hive Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateHive}>
        Create Hive
      </button>
    </div>
  );
}

export default Hive;