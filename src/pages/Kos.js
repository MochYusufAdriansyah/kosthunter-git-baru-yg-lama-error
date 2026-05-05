import { useEffect, useState } from "react";
import API from "../services/api";

export default function Kos() {
  const [kos, setKos] = useState([]);

  useEffect(() => {
    getKos();
  }, []);

  const getKos = async () => {
    const res = await API.get("/kos");
    setKos(res.data);
  };

  const booking = async (roomId) => {
    const token = localStorage.getItem("token");

    await API.post(
      "/booking",
      { roomId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking berhasil!");
  };

  return (
    <div>
      <h2>List Kos</h2>

      {kos.map((k) => (
        <div key={k.id} style={{ border: "1px solid", margin: 10 }}>
          <h3>{k.name}</h3>
          <p>{k.address}</p>

          {k.rooms.map((r) => (
            <div key={r.id}>
              Room: {r.number} - {r.status}
              {r.status === "AVAILABLE" && (
                <button onClick={() => booking(r.id)}>Booking</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
