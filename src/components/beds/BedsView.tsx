import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed } from "lucide-react";

export const BedsView = () => {
  const wards = [
    {
      name: "ICU",
      total: 20,
      occupied: 18,
      beds: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        status: i < 18 ? "occupied" : "available",
        patient: i < 18 ? `Patient ${i + 1}` : null,
      })),
    },
    {
      name: "General Ward",
      total: 50,
      occupied: 32,
      beds: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        status: i < 32 ? "occupied" : "available",
        patient: i < 32 ? `Patient ${i + 1}` : null,
      })),
    },
    {
      name: "Pediatric",
      total: 30,
      occupied: 15,
      beds: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        status: i < 15 ? "occupied" : "available",
        patient: i < 15 ? `Patient ${i + 1}` : null,
      })),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Bed Availability Management</h2>
        <p className="text-muted-foreground">Real-time ward and bed occupancy tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wards.map((ward) => (
          <Card key={ward.name} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">{ward.name}</h3>
              <Badge variant={ward.occupied / ward.total > 0.8 ? "destructive" : "default"}>
                {ward.occupied}/{ward.total}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-semibold text-foreground">
                  {Math.round((ward.occupied / ward.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    ward.occupied / ward.total > 0.8
                      ? "bg-danger"
                      : ward.occupied / ward.total > 0.6
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                  style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {ward.beds.slice(0, 20).map((bed) => (
                <div
                  key={bed.id}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                    bed.status === "occupied"
                      ? "bg-danger/20 border-2 border-danger"
                      : "bg-success/20 border-2 border-success"
                  }`}
                  title={bed.patient || "Available"}
                >
                  <Bed className={`w-4 h-4 ${
                    bed.status === "occupied" ? "text-danger" : "text-success"
                  }`} />
                </div>
              ))}
            </div>
            {ward.beds.length > 20 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                +{ward.beds.length - 20} more beds
              </p>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Bed 12 - ICU", event: "Patient admitted", time: "10 mins ago", type: "occupied" },
            { action: "Bed 45 - General", event: "Patient discharged", time: "1 hour ago", type: "available" },
            { action: "Bed 8 - Pediatric", event: "Patient admitted", time: "2 hours ago", type: "occupied" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === "occupied" ? "bg-danger" : "bg-success"
                }`} />
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.event}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
