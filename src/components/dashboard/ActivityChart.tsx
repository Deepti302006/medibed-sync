import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const admissionData = [
  { month: "Jan", admissions: 45, discharges: 42 },
  { month: "Feb", admissions: 52, discharges: 48 },
  { month: "Mar", admissions: 48, discharges: 50 },
  { month: "Apr", admissions: 61, discharges: 55 },
  { month: "May", admissions: 55, discharges: 58 },
  { month: "Jun", admissions: 67, discharges: 62 },
];

const departmentData = [
  { name: "ICU", patients: 18 },
  { name: "General", patients: 32 },
  { name: "Pediatric", patients: 15 },
  { name: "Cardiac", patients: 22 },
  { name: "Maternity", patients: 28 },
  { name: "Emergency", patients: 12 },
];

export const ActivityChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Admission & Discharge Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={admissionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="admissions"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Admissions"
            />
            <Line
              type="monotone"
              dataKey="discharges"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              name="Discharges"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Department-wise Patient Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="patients"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary) / 0.2)"
              name="Patients"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
