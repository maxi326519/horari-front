import { useEffect, useState } from "react";
import { FilterConfig } from "../../components/Filters/Filters";
import { useBusiness } from "../../hooks/useBusiness";
import { Business } from "../../interfaces/Business";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import BusinessForm from "../../components/Forms/BusinessForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";

const colConfig = [
  { header: "ID", key: "id" },
  { header: "Name", key: "name" },
  { header: "Industry", key: "industry" },
  { header: "Created At", key: "createdAt" },
  { header: "Employees", key: "employees" },
  { header: "Registers", key: "registers" },
];

const filtersConfig: FilterConfig = [
  {
    key: "name",
    type: "text",
    label: "Name",
  },
  {
    key: "industry",
    type: "text",
    label: "Industry",
  },
];

const filtersData = {
  name: "",
  industry: "",
};

const actionConfig = (
  handleEdit: (data: Business) => void,
  handleDelete: (data: Business) => void
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

export default function BusinessTable() {
  const businesses = useBusiness();
  const [rows, setRows] = useState<Business[]>([]);
  const [data, setData] = useState<Business>();
  const [form, setForm] = useState<boolean>(false);
  const [filter, setFilter] = useState(filtersData);

  // Load data
  useEffect(() => {
    const newRows = businesses.data.filter((row) => {
      if (filter.name && !row.name.toString().includes(filter.name.toString()))
        return false;
      if (filter.industry && row.industry !== filter.industry) return false;
      return true;
    });

    setRows(newRows);
  }, [businesses.data, filter]);

  // Create new Business
  async function handleCreate(businessData: Business) {
    if (!data) businesses.create(businessData);
    else businesses.update(businessData);
  }

  // Update Business
  function handleEdit(data: Business) {
    // Find business row data
    const currentBusiness = businesses.data.find(
      (business) => business.id === data.id
    );

    // If exist load to edit
    if (currentBusiness) {
      setData(currentBusiness);
      handleForm();
    }
  }

  // Open form
  function handleForm() {
    setForm(!form);
  }

  // Delete Business
  function handleDelete(data: Business) {
    businesses.deleteById(data.id!);
  }

  return (
    <Dashboard title="Negocios">
      <div className="relative flex flex-col gap-[10px] h-full p-[20px]">
        {form && (
          <BusinessForm
            data={data}
            title={data ? "Editar negocio" : "Agregar negocio"}
            onClose={handleForm}
            onSubmit={handleCreate}
          />
        )}
        <Controls
          data={rows}
          filters={filter}
          filtersConfig={filtersConfig}
          onFilter={setFilter}
          btnConfig={[{ label: "Agregar negocio", onClick: handleForm }]}
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
