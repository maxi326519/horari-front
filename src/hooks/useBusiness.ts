import { useBusinessStore } from "../stores/businessStore";
import { Business } from "../interfaces/Business";
import axios from "axios";
import Swal from "sweetalert2";

export function useBusiness() {
  const businessStore = useBusinessStore();

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("/businesses");
      businessStore.set(response.data);
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    }
  };

  const createBusiness = async (business: Business) => {
    try {
      const response = await axios.post("/businesses", business);
      businessStore.add(response.data);
      Swal.fire({
        title: "Creado",
        text: "Se creó el negocio con éxito",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al crear el negocio",
        icon: "error",
      });
      console.error("Failed to create business:", error);
    }
  };

  const updateBusiness = async (business: Business) => {
    try {
      const response = await axios.put(`/businesses/${business.id}`, business);
      businessStore.update(response.data);
      Swal.fire({
        title: "Actualizado",
        text: `Se actualizó el negocio con éxito`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al actualizar el negocio",
        icon: "error",
      });
      console.error("Failed to update business:", error);
    }
  };

  const deleteBusinessById = async (businessId: string) => {
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
        await axios.delete(`/businesses/${businessId}`);
        businessStore.delete(businessId);
        Swal.fire({
          title: "Eliminado",
          text: "Se eliminó el negocio con éxito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error inesperado al eliminar el negocio",
          icon: "error",
        });
        console.error("Failed to delete business:", error);
      }
    }
  };

  return {
    data: businessStore.data,
    get: fetchBusinesses,
    create: createBusiness,
    update: updateBusiness,
    deleteById: deleteBusinessById,
  };
}
