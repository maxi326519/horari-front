import { useEffect, useState } from "react";
import {
  initUser,
  initUserError,
  Users,
  UsersError,
  UsersRol,
} from "../../interfaces/Users";
import {
  initBusiness,
  initBusinessError,
  Business,
  BusinessError,
} from "../../interfaces/Business";
import Input from "../../components/Inputs/Input";

interface Props {
  title: string;
  data?: Business;
  onClose: () => void;
  onSubmit: (business: Business, user: Users) => Promise<void>;
}

export default function BusinessForm({
  title,
  data,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<Business>(initBusiness());
  const [error, setError] = useState<BusinessError>(initBusinessError());
  const [userData, setUserData] = useState<Users>(
    initUser({ rol: UsersRol.BUSINESS })
  );
  const [userError, setUserError] = useState<UsersError>(initUserError());

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  function handleClose() {
    onClose();
  }

  function handleChangeBusiness(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  }

  function handleChangeUser(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setUserError({ ...userError, [name]: "" });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (handleValidations() && handleValidationsUser()) {
      onSubmit(formData, userData).then(() => onClose());
    }
  }

  function handleValidations(): boolean {
    const error = initBusinessError();
    let value = true;

    if (formData.name === "") {
      error.name = "Debes completar este campo";
      value = false;
    }

    if (formData.email === "") {
      error.email = "Debes completar este campo";
      value = false;
    }

    setError(error);
    return value;
  }

  function handleValidationsUser(): boolean {
    const error: UsersError = initUserError();
    let value = true;

    if (userData.name === "") {
      error.name = "Debes completar este campo";
      value = false;
    }

    if (userData.email === "") {
      error.email = "Debes completar este campo";
      value = false;
    }

    if (userData.password === "") {
      error.password = "Debes completar este campo";
      value = false;
    }

    setUserError(error);
    return value;
  }

  return (
    <div className="absolute z-[1000] top-0 left-0 flex justify-center p-5 w-full h-full bg-[#4442]">
      <form
        className="flex flex-col gap-5 w-96 p-5 h-max rounded-md border border-gray-300 bg-white"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between items-center gap-2.5">
          <h3 className="m-0 p-0 font-semibold">{title}</h3>
          <button
            className="h-max px-2.5 border-none text-gray-500 bg-transparent hover:text-red-500"
            onClick={handleClose}
          >
            X
          </button>
        </header>
        <div className="flex flex-col gap-2.5">
          <h5 className="font-semibold">Empresa</h5>
          <Input
            name="name"
            label="Nombre de la Empresa"
            value={formData.name}
            error={error.name}
            onChange={handleChangeBusiness}
          />
          <Input
            name="email"
            label="Correo de la Empresa"
            value={formData.email}
            error={userError.email}
            onChange={(e) => {
              handleChangeBusiness(e);
              handleChangeUser(e);
            }}
          />
          {!data && (
            <div className="flex flex-col gap-2.5">
              <hr></hr>
              <h5 className="font-semibold">Usuario</h5>
              <Input
                name="name"
                label="Nombre del Usuario"
                value={userData.name}
                error={userError.name}
                onChange={handleChangeUser}
              />
              <Input
                name="password"
                label="Contraseña del Usuario"
                type="password"
                value={userData.password}
                error={userError.password}
                onChange={handleChangeUser}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2.5">
          <button className="flex-grow btn-primary" type="submit">
            {data ? "Actualizar" : "Agregar"}
          </button>
          <button
            className="flex-grow btn-secondary"
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
