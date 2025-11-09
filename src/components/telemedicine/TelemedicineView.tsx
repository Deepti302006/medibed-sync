import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Calendar, MessageSquare, Clock, UserCheck, Plus, Phone } from "lucide-react";

const statsData = [
  { label: "Today's Appointments", value: "12", icon: Calendar, variant: "primary" as const },
  { label: "Active Consultations", value: "3", icon: Video, variant: "success" as const },
  { label: "Pending Requests", value: "8", icon: Clock, variant: "warning" as const },
  { label: "Completed Today", value: "15", icon: UserCheck, variant: "danger" as const },
];

const appointments = [
  {
    id: 1,
    patient: "Vansh Patel",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    type: "Video Call",
    status: "scheduled",
  },
  {
    id: 2,
    patient: "Aarav Singh",
    time: "11:30 AM",
    doctor: "Dr. Michael Chen",
    type: "Phone Call",
    status: "in-progress",
  },
  {
    id: 3,
    patient: "karan Mehta",
    time: "02:00 PM",
    doctor: "Dr. Emily Rodriguez",
    type: "Video Call",
    status: "scheduled",
  },
  {
    id: 4,
    patient: "Sarah Das",
    time: "03:30 PM",
    doctor: "Dr. James Wilson",
    type: "Video Call",
    status: "scheduled",
  },
];

const consultationHistory = [
  {
    patient: "Vansh Patel",
    date: "2024-01-14",
    doctor: "Dr. Sarah Johnson",
    duration: "25 min",
    diagnosis: "Common Cold",
  },
  {
    patient: "Aarav Singh",
    date: "2024-01-13",
    doctor: "Dr. Michael Chen",
    duration: "30 min",
    diagnosis: "Hypertension Follow-up",
  },
  {
    patient: "karan Mehta",
    date: "2024-01-12",
    doctor: "Dr. Emily Rodriguez",
    duration: "20 min",
    diagnosis: "Annual Checkup",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-primary/10 text-primary border-primary/20";
    case "in-progress":
      return "bg-success/10 text-success border-success/20";
    case "completed":
      return "bg-muted text-muted-foreground border-muted";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const TelemedicineView = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.variant}/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.variant}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Today's Appointments</h3>
                <p className="text-sm text-muted-foreground">Manage scheduled consultations</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Patient Name</label>
                      <Input placeholder="Enter patient name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Doctor</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr1">Dr. Sarah Johnson</SelectItem>
                          <SelectItem value="dr2">Dr. Michael Chen</SelectItem>
                          <SelectItem value="dr3">Dr. Emily Rodriguez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date & Time</label>
                      <Input type="datetime-local" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Consultation Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="chat">Chat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Schedule Appointment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      {appointment.type === "Video Call" ? (
                        <Video className="h-5 w-5 text-primary" />
                      ) : (
                        <Phone className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <Badge variant="outline" className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    {appointment.status === "in-progress" ? (
                      <Button size="sm" className="gap-2">
                        <Video className="h-4 w-4" />
                        Join
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Active Consultations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 border-2 border-success/20 bg-success/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">Patient #{i}</p>
                      <p className="text-sm text-muted-foreground">Dr. Smith</p>
                    </div>
                    <Badge className="bg-success text-white">Live</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Video className="h-4 w-4" />
                      Join Call
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Consultation History</h3>
            <div className="space-y-3">
              {consultationHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <UserCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{record.patient}</p>
                      <p className="text-sm text-muted-foreground">{record.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                      <p className="text-sm font-medium">{record.duration}</p>
                    </div>
                    <div className="min-w-[150px]">
                      <Badge variant="outline">{record.diagnosis}</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
