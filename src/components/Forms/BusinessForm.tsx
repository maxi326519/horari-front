import { useEffect, useState } from "react";
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
  onSubmit: (data: Business) => Promise<void>;
}

export default function BusinessForm({
  title,
  data,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<Business>(initBusiness());
  const [error, setError] = useState<BusinessError>(initBusinessError());

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  function handleClose() {
    onClose();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target; // Get values
    setFormData({ ...formData, [name]: value }); // Update data
    setError({ ...error, [name]: "" }); // Clear errors
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (handleValidations()) {
      onSubmit(formData!);
    }
  }

  function handleValidations(): boolean {
    const error = initBusinessError();
    let value = true;

    if (formData.name === "") {
      error.name = "Debes completar este campo";
      value = false;
    }

    if (formData.industry === "") {
      error.industry = "Debes completar este campo";
      value = false;
    }

    setError(error);
    return value;
  }

  return (
    <div className="absolute z-[1500] top-0 left-0 flex justify-center p-5 w-full h-full bg-[#4442]">
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
            name="name"
            label="Nombre"
            value={formData.name}
            error={error.name}
            onChange={handleChange}
          />
          <Input
            name="industry"
            label="Industria"
            value={formData.industry}
            error={error.industry}
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
