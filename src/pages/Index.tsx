import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { MedicineView } from "@/components/medicine/MedicineView";
import { BedsView } from "@/components/beds/BedsView";
import { PatientsView } from "@/components/patients/PatientsView";
import { StaffView } from "@/components/staff/StaffView";
import { DollarSign, Video, FileText, Settings } from "lucide-react";

const Index = () => {
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
        return (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Billing & Insurance Module</h2>
            <p className="text-muted-foreground">Advanced billing features coming soon...</p>
          </div>
        );
      case "telemedicine":
        return (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Telemedicine Platform</h2>
            <p className="text-muted-foreground">Virtual consultation features coming soon...</p>
          </div>
        );
      case "reports":
        return (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Reports & Analytics</h2>
            <p className="text-muted-foreground">Detailed reporting features coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">System Settings</h2>
            <p className="text-muted-foreground">Configuration options coming soon...</p>
          </div>
        );
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
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
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
