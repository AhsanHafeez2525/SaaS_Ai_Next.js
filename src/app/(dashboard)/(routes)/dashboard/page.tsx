import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <p className="text-6xl text-green-400">Dashboard Page (Protected)</p>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
};

export default DashboardPage;
