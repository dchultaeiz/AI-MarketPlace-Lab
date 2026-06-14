import { useState } from "react";

export default function DemoCloudStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const consultarFunction = async () => {
    try {
      const response = await fetch(
        "http://localhost:7071/api/demoInfo"
      );

      if (!response.ok) {
        throw new Error("No se pudo consultar la Azure Function");
      }

      const resultado = await response.json();
      setData(resultado);
      setError("");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Estado Demo Cloud</h1>

      <button onClick={consultarFunction}>
        Consultar Azure Function
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {data && (
        <pre>
          {data && (
            <div style={{ marginTop: "20px" }}>
              <p><strong>Aplicación:</strong> {data.app}</p>
              <p><strong>Estado:</strong> {data.status}</p>
              <p><strong>Servicio:</strong> {data.service}</p>
              <p><strong>Base de datos:</strong> {data.database}</p>
              <p><strong>Mensaje:</strong> {data.message}</p>
              <p><strong>Fecha:</strong> {data.timestamp}</p>
            </div>
          )}
        </pre>
      )}
    </div>
  );
}