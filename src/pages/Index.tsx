import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { MedicineView } from "@/components/medicine/MedicineView";
import { BedsView } from "@/components/beds/BedsView";
import { PatientsView } from "@/components/patients/PatientsView";
import { StaffView } from "@/components/staff/StaffView";
import { BillingView } from "@/components/billing/BillingView";
import { TelemedicineView } from "@/components/telemedicine/TelemedicineView";
import { ReportsView } from "@/components/reports/ReportsView";
import { SettingsView } from "@/components/settings/SettingsView";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "medicine":
        return <MedicineView />;
      case "beds":
        return <BedsView />;
      case "patients":
        return <PatientsView />;
      case "staff":
        return <StaffView />;
      case "billing":
        return <BillingView />;
      case "telemedicine":
        return <TelemedicineView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onAdminClick={() => navigate('/login')}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
