import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const staff = [
  {
    id: "S001",
    name: "Dr. Sarah Smith",
    role: "Cardiologist",
    department: "Cardiac",
    contact: "+91 98765 43201",
    email: "sarah.smith@hospital.com",
    shift: "Morning",
    status: "On Duty",
    experience: "15 years",
  },
  {
    id: "S002",
    name: "Dr. Raj Patel",
    role: "General Physician",
    department: "General",
    contact: "+91 98765 43202",
    email: "raj.patel@hospital.com",
    shift: "Evening",
    status: "On Duty",
    experience: "10 years",
  },
  {
    id: "S003",
    name: "Nurse Emily Williams",
    role: "Head Nurse",
    department: "ICU",
    contact: "+91 98765 43203",
    email: "emily.w@hospital.com",
    shift: "Night",
    status: "On Duty",
    experience: "8 years",
  },
  {
    id: "S004",
    name: "Dr. Maria Garcia",
    role: "Gynecologist",
    department: "Maternity",
    contact: "+91 98765 43204",
    email: "maria.g@hospital.com",
    shift: "Morning",
    status: "On Leave",
    experience: "12 years",
  },
  {
    id: "S005",
    name: "Dr. James Chen",
    role: "Pediatrician",
    department: "Pediatric",
    contact: "+91 98765 43205",
    email: "james.c@hospital.com",
    shift: "Evening",
    status: "On Duty",
    experience: "9 years",
  },
  {
    id: "S006",
    name: "Pharmacist John Kumar",
    role: "Senior Pharmacist",
    department: "Pharmacy",
    contact: "+91 98765 43206",
    email: "john.k@hospital.com",
    shift: "Morning",
    status: "On Duty",
    experience: "7 years",
  },
];

export const StaffView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Staff Management</h2>
          <p className="text-muted-foreground">Manage hospital staff, schedules, and attendance</p>
        </div>
        <Button className="bg-gradient-primary shadow-medical">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: "156", color: "primary" },
          { label: "On Duty", value: "132", color: "success" },
          { label: "On Leave", value: "14", color: "warning" },
          { label: "Positions Open", value: "10", color: "danger" },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, role, or department..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiac">Cardiac</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
              <SelectItem value="maternity">Maternity</SelectItem>
              <SelectItem value="pharmacy">Pharmacy</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-shifts">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-shifts">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <Card
              key={member.id}
              className="p-5 hover:shadow-md transition-all duration-200 border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Badge
                  variant={member.status === "On Duty" ? "default" : "secondary"}
                  className={member.status === "On Duty" ? "bg-success" : ""}
                >
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Department:</span>
                  <span className="text-foreground font-medium">{member.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{member.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground text-xs">{member.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Shift</p>
                  <Badge variant="outline" className="mt-1">{member.shift}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{member.experience}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
