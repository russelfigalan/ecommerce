import StatsCards from "../_components/StatsCards";
import EarningsChart from "../_components/EarningsChart";

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <StatsCards />

      <div>
        <EarningsChart />
      </div>
    </div>
  );
}
