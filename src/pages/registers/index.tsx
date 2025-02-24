import { useEffect, useState } from "react";
import { FilterConfig } from "../../components/Filters/Filters";
import { useRegister } from "../../hooks/useRegister";
import { Register } from "../../interfaces/Register";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import RegisterForm from "../../components/Forms/RegisterForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";

const colConfig = [
  { header: "ID", key: "id" },
  { header: "Employee ID", key: "employeeId" },
  { header: "Business ID", key: "businessId" },
  { header: "Check-In Time", key: "checkInTime" },
  { header: "Check-Out Time", key: "checkOutTime" },
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

export default function RegisterTable() {
  const registers = useRegister();
  const [rows, setRows] = useState<Register[]>([]);
  const [data, setData] = useState<Register>();
  const [form, setForm] = useState<boolean>(false);
  const [filter, setFilter] = useState(filtersData);

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
    if (!data) registers.create(registerData);
    else registers.update(registerData);
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
  function handleDelete(data: Register) {
    registers.deleteById(data.id!);
  }

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
