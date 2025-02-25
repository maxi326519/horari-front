import { useBusinessStore } from "../stores/businessStore";
import { useUserStore } from "../stores/usersStore";
import { Business } from "../interfaces/Business";
import { Users } from "../interfaces/Users";
import axios from "axios";
import Swal from "sweetalert2";

export function useBusiness() {
  const businessStore = useBusinessStore();
  const usersStore = useUserStore();

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("/business");
      businessStore.set(response.data);
    } catch (error) {
      console.error("Failed to fetch business:", error);
    }
  };

  const createBusiness = async (business: Business, user: Users) => {
    try {
      // Create business and user
      const businessResponse = await axios.post("/business", business);
      const userResponse = await axios.post("/users", {
        ...user,
        businessId: businessResponse.data.id,
      });

      // Save new data created
      businessStore.add(businessResponse.data);
      usersStore.add(userResponse.data);

      Swal.fire({
        title: "Creado",
        text: "Se creó el empresa con éxito",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al crear el empresa",
        icon: "error",
      });
      console.error("Failed to create business:", error);
    }
  };

  const updateBusiness = async (business: Business) => {
    try {
      const response = await axios.put(`/business/${business.id}`, business);
      businessStore.update(response.data);
      Swal.fire({
        title: "Actualizado",
        text: `Se actualizó el empresa con éxito`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al actualizar el empresa",
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
        await axios.delete(`/business/${businessId}`);
        businessStore.delete(businessId);
        Swal.fire({
          title: "Eliminado",
          text: "Se eliminó el empresa con éxito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error inesperado al eliminar el empresa",
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
