import { useEffect, useState } from "react";
import { useBusiness } from "../../hooks/useBusiness";
import { Business } from "../../interfaces/Business";
import { Users } from "../../interfaces/Users";

import Table from "../../components/Table/Table";
import Dashboard from "../../components/Dashboard/Dashboard";
import Controls from "../../components/Controls/Controls";
import BusinessForm from "../../components/Forms/BusinessForm";

import editarSvg from "../../assets/svg/dashboard/edit.svg";
import deleteSvg from "../../assets/svg/dashboard/delete.svg";

const colConfig = [
  { header: "Name", key: "name" },
  { header: "Correo", key: "email" },
];

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
  const [data, setData] = useState<Business>();
  const [form, setForm] = useState<boolean>(false);

  // Get users
  useEffect(() => {
    if (businesses.data.length === 0) businesses.get();
  }, []);

  // Create new Business
  async function handleCreate(businessData: Business, user?: Users) {
    if (!data && user) {
      await businesses.create(businessData, user);
    } else await businesses.update(businessData);
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
  async function handleDelete(data: Business) {
    await businesses.deleteById(data.id!);
  }

  return (
    <Dashboard title="Empresas">
      <div className="relative flex flex-col gap-[10px] h-full p-[20px]">
        {form && (
          <BusinessForm
            data={data}
            title={data ? "Editar empresa" : "Agregar empresa"}
            onClose={handleForm}
            onSubmit={handleCreate}
          />
        )}
        <Controls
          data={businesses.data}
          btnConfig={[{ label: "Agregar empresa", onClick: handleForm }]}
        />
        <Table
          data={businesses.data}
          columns={colConfig}
          actions={actionConfig(handleEdit, handleDelete)}
        />
      </div>
    </Dashboard>
  );
}
