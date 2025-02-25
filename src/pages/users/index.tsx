import { useEffect, useState } from "react";
import { FilterConfig } from "../../components/Filters/Filters";
import { useUsers } from "../../hooks/useUsers";
import { Users, UsersRol } from "../../interfaces/Users";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import UsersForm from "../../components/Forms/UserForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";
import useAuth from "../../hooks/useAuth";

const colConfig = [
  { header: "Nombre", key: "name" },
  { header: "Correo", key: "email" },
  { header: "Rol", key: "rol" },
];

const filtersConfig: FilterConfig = [
  {
    key: "rol",
    type: "select",
    label: "Rol",
    options: Object.values(UsersRol).filter((value) => value),
  },
];

const filtersData = {
  rol: "",
};

const actionConfig = (
  handleEdit: (data: Users) => void,
  handleDelete: (data: Users) => void
) => [
  {
    icon: editarSvg,
    onClick: handleEdit,
  },
  {
    icon: deleteSvg,
    onClick: handleDelete,
  },
];

export default function UsersTable() {
  const sesion = useAuth();
  const users = useUsers();
  const [rows, setRows] = useState<Users[]>([]);
  const [data, setData] = useState<Users>();
  const [form, setForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState(filtersData);

  // Get users
  useEffect(() => {
    if (sesion.user?.id && users.data.length === 0) users.get();
  }, [sesion.user]);

  // Load data
  useEffect(() => {
    const newRows = users.data.filter((row) => {
      if (
        search &&
        !row.name.toLowerCase().includes(search.toLowerCase()) &&
        search &&
        !row.email.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (filter.rol && row.rol !== filter.rol) return false;
      return true;
    });

    setRows(newRows);
  }, [users.data, filter, search]);

  // Create or Update User
  async function handleCreate(userData: Users) {
    if (!data) users.create(userData);
    else users.update(userData);
  }

  // Edit User
  function handleEdit(data: Users) {
    const currentUser = users.data.find((user) => user.id === data.id);
    if (currentUser) {
      setData(currentUser);
      handleForm();
    }
  }

  // Open form
  function handleForm() {
    setForm(!form);
  }

  // Delete User
  function handleDelete(data: Users) {
    users.deleteById(data.id!);
  }

  return (
    <Dashboard title="Usuarios">
      <div className="relative flex flex-col gap-[10px] h-full p-[20px]">
        {form && (
          <UsersForm
            data={data}
            title={data ? "Editar usuario" : "Agregar usuario"}
            onClose={handleForm}
            onSubmit={handleCreate}
          />
        )}
        <Controls
          searchConfig={{
            value: search,
            setValue: setSearch,
          }}
          data={rows}
          filters={filter}
          filtersConfig={filtersConfig}
          onFilter={setFilter}
          btnConfig={[{ label: "Agregar usuario", onClick: handleForm }]}
        />
        <Table
          data={rows}
          columns={colConfig}
          actions={actionConfig(handleEdit, handleDelete)}
        />
      </div>
    </Dashboard>
  );
}
