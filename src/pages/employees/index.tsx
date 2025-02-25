import { useEffect, useState } from "react";
import { Users, UsersRol } from "../../interfaces/Users";
import { FilterConfig } from "../../components/Filters/Filters";
import { useUsers } from "../../hooks/useUsers";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import EmployeeForm from "../../components/Forms/EmployeeForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";
import useAuth from "../../hooks/useAuth";

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

export default function EmployeesTable() {
  const users = useUsers();
  const sesion = useAuth();
  const [rows, setRows] = useState<Users[]>([]);
  const [data, setData] = useState<Users>();
  const [form, setForm] = useState<boolean>(false);
  const [filter, setFilter] = useState(filtersData);

  // Get users
  useEffect(() => {
    if (users.data.length === 0) users.get();
  }, []);

  // Load data
  useEffect(() => {
    const newRows = users.data
      .filter((user) => user.rol === UsersRol.EMPLOYEE)
      .filter((row) => {
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
    if (!data)
      await users.create({ ...userData, businessId: sesion.user?.businessId });
    else await users.update(userData);
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
  async function handleDelete(data: Users) {
    await users.deleteById(data.id!);
  }

  return (
    <Dashboard title="Empleados">
      <div className="relative flex flex-col gap-[10px] h-full p-[20px]">
        {form && (
          <EmployeeForm
            data={data}
            title={data ? "Editar empleado" : "Agregar empleado"}
            onClose={handleForm}
            onSubmit={handleCreate}
          />
        )}
        <Controls
          data={rows}
          filters={filter}
          filtersConfig={filtersConfig}
          onFilter={setFilter}
          btnConfig={[{ label: "Agregar empleado", onClick: handleForm }]}
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
