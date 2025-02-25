import { useEmployeeRegister } from "../hooks/useEmployeeRegister";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Dashboard from "../components/Dashboard/Dashboard";

const NewRegister = () => {
  const sesion = useAuth();
  const register = useEmployeeRegister();

  // Get current rgister
  useEffect(() => {
    if (sesion.user?.id) register.getCurrent();
  }, [sesion.user]);

  // Create new register
  const handleCheckIn = async () => {
    console.log(sesion.user);
    register.ingress({
      checkInTime: new Date(),
      checkOutTime: null,
      employeeId: sesion.user?.id || "",
      businessId: sesion.user?.businessId || "",
    });
  };

  // Update register with checkout time
  const handleCheckOut = async () => {
    if (register.current && register.current.id) {
      register.egress({
        ...register.current,
        checkOutTime: new Date(),
      });
    }
  };

  return (
    <Dashboard title="Registro">
      <div className="flex flex-col w-full max-w-md h-full mx-auto mt-6 p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
          Mi registro del día
        </h2>

        {/* Paso 1: Registro de ingreso */}
        {!register.current?.checkInTime && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-center">
              Por favor, registra tu hora de entrada.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCheckIn}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Registrar Entrada
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Registro de egreso */}
        {register.current?.checkInTime && !register.current?.checkOutTime && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">
              <strong>Hora de entrada:</strong>{" "}
              {new Date(register.current.checkInTime).toLocaleTimeString()}
            </p>
            <p className="text-gray-600 mt-2 text-center">
              Por favor, registra tu hora de salida.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCheckOut}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Registrar Salida
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Mensaje final */}
        {register.current?.checkInTime && register.current?.checkOutTime && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">
              <strong>Hora de entrada:</strong>{" "}
              {new Date(register.current.checkInTime).toLocaleTimeString()}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Hora de salida:</strong>{" "}
              {new Date(register.current.checkOutTime).toLocaleTimeString()}
            </p>
            <p className="text-gray-600 mt-4 text-center font-bold">
              ¡Registro completo! Gracias por tu trabajo hoy.
            </p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default NewRegister;
