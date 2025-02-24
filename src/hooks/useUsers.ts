import { useUserStore } from "../stores/usersStore";
import { Users } from "../interfaces/Users";
import axios from "axios";
import Swal from "sweetalert2";

export function useUsers() {
  const usersStore = useUserStore();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      usersStore.set(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const createUser = async (user: Users) => {
    try {
      const response = await axios.post("/users", user);
      usersStore.add(response.data);
      Swal.fire({
        title: "Creado",
        text: "Se creó el usuario con éxito",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al crear el usuario",
        icon: "error",
      });
      console.error("Failed to create user:", error);
    }
  };

  const updateUser = async (user: Users) => {
    try {
      const response = await axios.put(`/users/${user.id}`, user);
      usersStore.update(response.data);
      Swal.fire({
        title: "Actualizado",
        text: `Se actualizó el usuario ${user.name} con éxito`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al actualizar el usuario",
        icon: "error",
      });
      console.error("Failed to update user:", error);
    }
  };
  const deleteUserById = async (userId: string) => {
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
        await axios.delete(`/users/${userId}`);
        usersStore.delete(userId);
        Swal.fire({
          title: "Eliminado",
          text: "Se eliminó el usuario con éxito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error inesperado al eliminar el usuario",
          icon: "error",
        });
        console.error("Failed to delete user:", error);
      }
    }
  };

  return {
    data: usersStore.data,
    get: fetchUsers,
    create: createUser,
    update: updateUser,
    deleteById: deleteUserById,
  };
}
