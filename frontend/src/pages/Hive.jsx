import { useParams } from "react-router-dom";

function Hive() {
  const { id } = useParams();

  return (
    <div>
      <h1>Hive Workspace</h1>

      <p>Hive ID: {id}</p>
    </div>
  );
}

export default Hive;