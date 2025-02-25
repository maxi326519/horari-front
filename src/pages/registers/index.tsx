import { useEffect, useState } from "react";
import { FilterConfig } from "../../components/Filters/Filters";
import { useRegister } from "../../hooks/useRegister";
import { Register } from "../../interfaces/Register";
import formatDateToDDMMYY from "../../scripts/formatDateToDDMMYY";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import RegisterForm from "../../components/Forms/RegisterForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";
import useAuth from "../../hooks/useAuth";
import formatDateToHHMM from "../../scripts/formatDateToRegister copy";

const colConfig = [
  {
    header: "Fecha",
    key: "checkInTime",
    render: (data: Register) => (
      <span>{formatDateToDDMMYY(data.checkInTime)}</span>
    ),
  },
  {
    header: "Check In",
    key: "checkInTime",
    render: (data: Register) => (
      <span>{formatDateToHHMM(data.checkInTime)} hs</span>
    ),
  },
  {
    header: "Check Out",
    key: "checkOutTime",
    render: (data: Register) => (
      <span>
        {data.checkOutTime ? formatDateToHHMM(data.checkOutTime) : "-"} hs
      </span>
    ),
  },
];

const filtersConfig: FilterConfig = [
  {
    key: "employeeId",
    type: "text",
    label: "Employee ID",
  },
  {
    key: "businessId",
    type: "text",
    label: "Business ID",
  },
];

const filtersData = {
  employeeId: "",
  businessId: "",
};

export default function RegisterTable() {
  const sesion = useAuth();
  const registers = useRegister();
  const [rows, setRows] = useState<Register[]>([]);
  const [data, setData] = useState<Register>();
  const [form, setForm] = useState<boolean>(false);
  const [filter, setFilter] = useState(filtersData);

  // Get users
  useEffect(() => {
    if (sesion.user?.id && registers.data.length === 0)
      registers.get(sesion.user);
  }, [sesion.user]);

  // Load data
  useEffect(() => {
    const newRows = registers.data.filter((row) => {
      if (
        filter.employeeId &&
        !row.employeeId.toString().includes(filter.employeeId.toString())
      )
        return false;
      if (filter.businessId && row.businessId !== filter.businessId)
        return false;
      return true;
    });

    setRows(newRows);
  }, [registers.data, filter]);

  // Create new Register
  async function handleCreate(registerData: Register) {
    if (!data) await registers.create(registerData);
    else await registers.update(registerData);
  }

  // Update Register
  function handleEdit(data: Register) {
    // Find register row data
    const currentRegister = registers.data.find(
      (register) => register.id === data.id
    );

    // If exist load to edit
    if (currentRegister) {
      setData(currentRegister);
      handleForm();
    }
  }

  // Open form
  function handleForm() {
    setForm(!form);
  }

  // Delete Register
  async function handleDelete(data: Register) {
    await registers.deleteById(data.id!);
  }

  const actionConfig = (
    handleEdit: (data: Register) => void,
    handleDelete: (data: Register) => void
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

  return (
    <Dashboard title="Registros">
      <div className="relative flex flex-col gap-[10px] h-full p-[20px]">
        {form && (
          <RegisterForm
            data={data}
            title={data ? "Editar registro" : "Agregar registro"}
            onClose={handleForm}
            onSubmit={handleCreate}
          />
        )}
        <Controls
          data={rows}
          filters={filter}
          filtersConfig={filtersConfig}
          onFilter={setFilter}
          btnConfig={[{ label: "Agregar registro", onClick: handleForm }]}
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
