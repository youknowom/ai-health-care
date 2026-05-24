//ai health doctor
import React from "react";
import DoctorsAgentList from "./_components/DoctorsAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";
import MLFeaturesGrid from "./_components/MLFeaturesGrid";
import HistoryList from "./_components/HistoryList";

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
        <AddNewSessionDialog />
      </div>

      {/* AI Feature Cards */}
      <MLFeaturesGrid />

      {/* History */}
      <div className="mt-16">
        <HistoryList />
      </div>

      {/* Doctor Agents */}
      <DoctorsAgentList />
    </div>
  );
};

export default Dashboard;
