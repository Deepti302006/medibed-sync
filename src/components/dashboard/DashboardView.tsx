import { StatsCard } from "./StatsCard";
import { Users, Bed, Package, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time hospital operations monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value="324"
          icon={Users}
          trend={{ value: "12% from last month", positive: true }}
          variant="primary"
        />
        <StatsCard
          title="Available Beds"
          value="48/120"
          icon={Bed}
          trend={{ value: "8 occupied today", positive: false }}
          variant="success"
        />
        <StatsCard
          title="Medicine Stock"
          value="1,284"
          icon={Package}
          trend={{ value: "24 items low stock", positive: false }}
          variant="warning"
        />
        <StatsCard
          title="Active Staff"
          value="156"
          icon={Activity}
          trend={{ value: "4 on leave", positive: true }}
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Admissions</h3>
          <div className="space-y-4">
            {[
              { name: "John Doe", age: 45, ward: "ICU", time: "2 hours ago" },
              { name: "Sarah Johnson", age: 32, ward: "General", time: "4 hours ago" },
              { name: "Michael Brown", age: 58, ward: "Cardiac", time: "6 hours ago" },
            ].map((patient, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div>
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">Age: {patient.age} • Ward: {patient.ward}</p>
                </div>
                <span className="text-xs text-muted-foreground">{patient.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Low Stock Alerts</h3>
          <div className="space-y-4">
            {[
              { name: "Paracetamol 500mg", quantity: 45, status: "critical" },
              { name: "Amoxicillin 250mg", quantity: 78, status: "low" },
              { name: "Insulin Injection", quantity: 23, status: "critical" },
            ].map((medicine, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">{medicine.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {medicine.quantity} units</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  medicine.status === "critical" 
                    ? "bg-danger/10 text-danger" 
                    : "bg-warning/10 text-warning"
                }`}>
                  {medicine.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Today's Appointments</h3>
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-primary mb-2">28</p>
            <p className="text-sm text-muted-foreground">Scheduled consultations</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Emergency Cases</h3>
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-danger mb-2">5</p>
            <p className="text-sm text-muted-foreground">Active emergencies</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Revenue Today</h3>
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-success mb-2">₹1.2L</p>
            <p className="text-sm text-muted-foreground">Billing collected</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
