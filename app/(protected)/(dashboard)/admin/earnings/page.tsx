import StatsCards from "../../_components/StatsCards";
import EarningsChart from "../../_components/EarningsChart";
import MonthlyEarningsTable from "../../_components/MonthlyEarningsTable";

export default function EarningsPage() {
  return (
    <>
      <div className="space-y-10">
        <StatsCards />
        <section className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Earnings Overview</h2>
          <EarningsChart />
        </section>
        <section className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Monthly Breakdown</h2>
          <MonthlyEarningsTable />
        </section>
      </div>
    </>
  );
}
