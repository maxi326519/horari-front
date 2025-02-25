import { useEffect, useState } from "react";
import {
  initUser,
  initUserError,
  Users,
  UsersError,
  UsersRol,
} from "../../interfaces/Users";

import Input from "../../components/Inputs/Input";
import SelectInput from "../../components/Inputs/SelectInput";

interface Props {
  title: string;
  data?: Users;
  onClose: () => void;
  onSubmit: (data: Users) => Promise<void>;
}

export default function UsersForm({ title, data, onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState<Users>(initUser());
  const [error, setError] = useState<UsersError>(initUserError());

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
    const error = initUserError();
    let value = true;

    if (formData.rol === "") {
      error.rol = "Debes completar este campo";
      value = false;
    }

    if (formData.name === "") {
      error.name = "Debes completar este campo";
      value = false;
    }

    if (formData.email === "") {
      error.email = "Debes completar este campo";
      value = false;
    }

    if (formData.password === "") {
      error.password = "Debes completar este campo";
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
          <SelectInput
            name="rol"
            label="Rol"
            value={formData.rol}
            error={error.rol}
            list={Object.values(UsersRol).filter((rol) => rol)}
            onChange={handleChange}
          />
          <Input
            name="name"
            label="Nombre"
            value={formData.name}
            error={error.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="Correo"
            value={formData.email}
            error={error.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            value={formData.password || ""}
            error={error.password}
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
