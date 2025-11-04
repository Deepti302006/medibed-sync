import { StatsCard } from "./StatsCard";
import { ActivityChart } from "./ActivityChart";
import { Users, Bed, Package, Activity, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DashboardView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back, Dr. Admin. Here's what's happening today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
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
          trend={{ value: "60% occupied", positive: false }}
          variant="success"
        />
        <StatsCard
          title="Medicine Items"
          value="1,284"
          icon={Package}
          trend={{ value: "24 low stock alerts", positive: false }}
          variant="warning"
        />
        <StatsCard
          title="Active Staff"
          value="156"
          icon={Activity}
          trend={{ value: "4 on leave today", positive: true }}
          variant="primary"
        />
      </div>

      <ActivityChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Admissions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {[
              { 
                name: "John Doe", 
                age: 45, 
                ward: "ICU", 
                time: "2 hours ago",
                condition: "Critical",
                doctor: "Dr. Smith"
              },
              { 
                name: "Sarah Johnson", 
                age: 32, 
                ward: "General", 
                time: "4 hours ago",
                condition: "Stable",
                doctor: "Dr. Patel"
              },
              { 
                name: "Michael Brown", 
                age: 58, 
                ward: "Cardiac", 
                time: "6 hours ago",
                condition: "Under Observation",
                doctor: "Dr. Williams"
              },
              { 
                name: "Emma Wilson", 
                age: 28, 
                ward: "Maternity", 
                time: "8 hours ago",
                condition: "Stable",
                doctor: "Dr. Garcia"
              },
            ].map((patient, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{patient.name}</p>
                    <Badge variant={patient.condition === "Critical" ? "destructive" : "secondary"} className="text-xs">
                      {patient.condition}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Age: {patient.age} • Ward: {patient.ward} • {patient.doctor}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {patient.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Critical Alerts</h3>
            <Badge variant="destructive" className="animate-pulse-subtle">3 Active</Badge>
          </div>
          <div className="space-y-3">
            {[
              { 
                title: "Low Stock Alert", 
                desc: "Paracetamol 500mg - Only 45 units left",
                priority: "high",
                action: "Reorder Now"
              },
              { 
                title: "Equipment Maintenance", 
                desc: "ICU Ventilator #3 requires servicing",
                priority: "medium",
                action: "Schedule"
              },
              { 
                title: "Staff Shortage", 
                desc: "Night shift nurses needed for General Ward",
                priority: "high",
                action: "Assign Staff"
              },
            ].map((alert, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-lg bg-secondary/50 border-l-4 hover:bg-secondary transition-colors"
                style={{ 
                  borderLeftColor: alert.priority === "high" ? "hsl(var(--danger))" : "hsl(var(--warning))" 
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.desc}</p>
                  </div>
                  <Button size="sm" variant="outline" className="whitespace-nowrap">
                    {alert.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Today's Appointments</h3>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-primary mb-1">28</p>
            <p className="text-xs text-muted-foreground">12 completed, 16 pending</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Emergency Cases</h3>
            <div className="w-2 h-2 rounded-full bg-danger animate-pulse-subtle" />
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-danger mb-1">5</p>
            <p className="text-xs text-muted-foreground">2 critical, 3 stable</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Revenue Today</h3>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-success mb-1">₹1.2L</p>
            <p className="text-xs text-muted-foreground">+18% from yesterday</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Wait Time</h3>
            <Clock className="w-4 h-4 text-warning" />
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-foreground mb-1">24m</p>
            <p className="text-xs text-muted-foreground">-5 mins from avg</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

