import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { MedicineView } from "@/components/medicine/MedicineView";
import { BedsView } from "@/components/beds/BedsView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "medicine":
        return <MedicineView />;
      case "beds":
        return <BedsView />;
      case "patients":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Patient Management</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "staff":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Staff Management</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "billing":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Billing & Insurance</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "telemedicine":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Telemedicine</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "reports":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Reports & Analytics</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
