import { useEffect, useState } from "react";
import {
  initRegister,
  initRegisterError,
  Register,
  RegisterError,
} from "../../interfaces/Register";

import Input from "../../components/Inputs/Input";
import dateToStringInput from "../../scripts/dateToStringInput";

interface Props {
  title: string;
  data?: Register;
  onClose: () => void;
  onSubmit: (data: Register) => Promise<void>;
}

export default function RegisterForm({
  title,
  data,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<Register>(initRegister());
  const [error, setError] = useState<RegisterError>(initRegisterError());

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  function handleClose() {
    onClose();
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target; // Get values
    setFormData({ ...formData, [name]: value }); // Update data
    setError({ ...error, [name]: "" }); // Clear errors
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (handleValidations()) {
      onSubmit(formData!).then(() => onClose());
    }
  }

  function handleValidations(): boolean {
    const error = initRegisterError();
    let value = true;

    if (formData.employeeId === "") {
      error.employeeId = "Debes completar este campo";
      value = false;
    }

    if (formData.businessId === "") {
      error.businessId = "Debes completar este campo";
      value = false;
    }

    if (formData.checkInTime === null) {
      error.checkInTime = "Debes completar este campo";
      value = false;
    }

    setError(error);
    return value;
  }

  return (
    <div className="absolute z-[1000] top-0 left-0 flex justify-center p-5 w-full h-full bg-[#4442]">
      <form
        className="flex flex-col gap-5 w-96 p-5 h-max rounded border border-gray-300 bg-white"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between items-center gap-2.5">
          <h3 className="m-0 p-0">{title}</h3>
          <button
            className="h-max px-2.5 border-none text-gray-500 bg-transparent hover:text-red-500"
            onClick={handleClose}
          >
            X
          </button>
        </header>
        <div className="flex flex-col gap-2.5">
          <Input
            name="employeeId"
            label="ID del Empleado"
            value={formData.employeeId}
            error={error.employeeId}
            onChange={handleChange}
          />
          <Input
            name="businessId"
            label="ID del Empresa"
            value={formData.businessId}
            error={error.businessId}
            onChange={handleChange}
          />
          <Input
            name="checkInTime"
            label="Hora de Entrada"
            value={dateToStringInput(formData.checkInTime)}
            error={error.checkInTime}
            onChange={handleChange}
          />
          <Input
            name="checkOutTime"
            label="Hora de Salida"
            value={
              formData.checkOutTime
                ? dateToStringInput(formData.checkOutTime)
                : ""
            }
            error={error.checkOutTime}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2.5">
          <button className="flex-grow btn-primary" type="submit">
            {data ? "Actualizar" : "Agregar"}
          </button>
          <button
            className="flex-grow btn-primary"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
