import { useEffect, useState } from "react";
import { FilterConfig } from "../../components/Filters/Filters";
import { useUsers } from "../../hooks/useUsers";
import { Users } from "../../interfaces/Users";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import UsersForm from "../../components/Forms/UserForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";

const colConfig = [
  { header: "Nombre", key: "name" },
  { header: "Correo", key: "email" },
  { header: "Rol", key: "rol" },
  { header: "Empresa", key: "company?.name" },
];

const filtersConfig: FilterConfig = [
  {
    key: "name",
    type: "text",
    label: "Nombre",
  },
  {
    key: "email",
    type: "text",
    label: "Correo",
  },
];

const filtersData = {
  name: "",
  email: "",
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
  const users = useUsers();
  const [rows, setRows] = useState<Users[]>([]);
  const [data, setData] = useState<Users>();
  const [form, setForm] = useState<boolean>(false);
  const [filter, setFilter] = useState(filtersData);

  // Load data
  useEffect(() => {
    const newRows = users.data.filter((row) => {
      if (
        filter.name &&
        !row.name.toLowerCase().includes(filter.name.toLowerCase())
      )
        return false;
      if (
        filter.email &&
        !row.email.toLowerCase().includes(filter.email.toLowerCase())
      )
        return false;
      return true;
    });

    setRows(newRows);
  }, [users.data, filter]);

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
