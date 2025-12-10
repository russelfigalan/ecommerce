import CustomersTable from "../../_components/CustomersTable";

export default function CustomersPage() {
  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Customers</h1>
        <CustomersTable />
      </div>
    </>
  );
}
