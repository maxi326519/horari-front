import { useRegisterStore } from "../stores/registersStore";
import { Register } from "../interfaces/Register";
import axios from "axios";
import Swal from "sweetalert2";

export function useRegister() {
  const registersStore = useRegisterStore();

  const fetchRegisters = async () => {
    try {
      const response = await axios.get("/registers");
      registersStore.set(response.data);
    } catch (error) {
      console.error("Failed to fetch registers:", error);
    }
  }

  const createRegister = async (register: Register) => {
    try {
      const response = await axios.post("/registers", register);
      registersStore.add(response.data);
      Swal.fire({
        title: "Creado",
        text: "Se creó el registro con éxito",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al crear el registro",
        icon: "error",
      });
      console.error("Failed to create register:", error);
    }
  };

  const updateRegister = async (register: Register) => {
    try {
      const response = await axios.put(`/registers/${register.id}`, register);
      registersStore.update(response.data);
      Swal.fire({
        title: "Actualizado",
        text: `Se actualizó el registro con éxito`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al actualizar el registro",
        icon: "error",
      });
      console.error("Failed to update register:", error);
    }
  };

  const deleteRegisterById = async (registerId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/registers/${registerId}`);
        registersStore.delete(registerId);
        Swal.fire({
          title: "Eliminado",
          text: "Se eliminó el registro con éxito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error inesperado al eliminar el registro",
          icon: "error",
        });
        console.error("Failed to delete register:", error);
      }
    }
  };

  return {
    data: registersStore.data, 
    get: fetchRegisters,
    create: createRegister,
    update: updateRegister,
    deleteById: deleteRegisterById,
  };
}
