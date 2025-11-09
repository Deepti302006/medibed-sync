import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, FileText, Phone, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const patients = [
  {
    id: "P001",
    name: "Vansh Gupta",
    age: 45,
    gender: "Male",
    contact: "+91 98765 43210",
    email: "vansh.doe@email.com",
    ward: "ICU",
    admissionDate: "2025-11-01",
    diagnosis: "Cardiac Arrest",
    doctor: "Dr. Suman",
    status: "Critical",
    bloodGroup: "O+",
  },
  {
    id: "P002",
    name: "Jayansh Sharma",
    age: 32,
    gender: "Female",
    contact: "+91 98765 43211",
    email: "sarah.j@email.com",
    ward: "General",
    admissionDate: "2025-11-02",
    diagnosis: "Viral Fever",
    doctor: "Dr. Raj Patel",
    status: "Stable",
    bloodGroup: "A+",
  },
  {
    id: "P003",
    name: "Aarav Mehta",
    age: 58,
    gender: "Male",
    contact: "+91 98765 43212",
    email: "m.brown@email.com",
    ward: "Cardiac",
    admissionDate: "2025-11-01",
    diagnosis: "Angina Pectoris",
    doctor: "Dr. Emily Williams",
    status: "Under Observation",
    bloodGroup: "B+",
  },
  {
    id: "P004",
    name: "Emma Wilson",
    age: 28,
    gender: "Female",
    contact: "+91 98765 43213",
    email: "emma.w@email.com",
    ward: "Maternity",
    admissionDate: "2025-11-03",
    diagnosis: "Prenatal Care",
    doctor: "Dr. Maria Garcia",
    status: "Stable",
    bloodGroup: "AB+",
  },
  {
    id: "P005",
    name: "David Lee",
    age: 12,
    gender: "Male",
    contact: "+91 98765 43214",
    email: "david.l@email.com",
    ward: "Pediatric",
    admissionDate: "2025-11-02",
    diagnosis: "Asthma",
    doctor: "Dr. James Chen",
    status: "Recovering",
    bloodGroup: "O-",
  },
];

export const PatientsView = () => {
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Patient Management</h2>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <Button className="bg-gradient-primary shadow-medical">
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, ID, or contact..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="cardiac">Cardiac</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
              <SelectItem value="maternity">Maternity</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="recovering">Recovering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Patient ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Name</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Age/Gender</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Ward</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Diagnosis</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Doctor</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm text-muted-foreground">{patient.id}</td>
                  <td className="py-4 px-4 font-medium text-foreground">{patient.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {patient.age}Y / {patient.gender}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline">{patient.ward}</Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{patient.diagnosis}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{patient.doctor}</td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        patient.status === "Critical"
                          ? "destructive"
                          : patient.status === "Stable"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Patient Details</DialogTitle>
                          <DialogDescription>
                            Complete medical record for {patient.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedPatient && (
                          <div className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Patient ID
                                </label>
                                <p className="text-foreground font-mono mt-1">
                                  {selectedPatient.id}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Blood Group
                                </label>
                                <p className="text-foreground font-semibold mt-1">
                                  {selectedPatient.bloodGroup}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Age / Gender
                                </label>
                                <p className="text-foreground mt-1">
                                  {selectedPatient.age} Years / {selectedPatient.gender}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Admission Date
                                </label>
                                <p className="text-foreground mt-1">
                                  {new Date(selectedPatient.admissionDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3 border-t border-border pt-4">
                              <h4 className="font-semibold text-foreground">Contact Information</h4>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-foreground">{selectedPatient.contact}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span className="text-foreground">{selectedPatient.email}</span>
                              </div>
                            </div>

                            <div className="space-y-3 border-t border-border pt-4">
                              <h4 className="font-semibold text-foreground">Medical Details</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Current Ward
                                  </label>
                                  <Badge variant="outline" className="mt-1">
                                    {selectedPatient.ward}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Status
                                  </label>
                                  <div className="mt-1">
                                    <Badge
                                      variant={
                                        selectedPatient.status === "Critical"
                                          ? "destructive"
                                          : "secondary"
                                      }
                                    >
                                      {selectedPatient.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Diagnosis
                                </label>
                                <p className="text-foreground mt-1">{selectedPatient.diagnosis}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Attending Doctor
                                </label>
                                <p className="text-foreground mt-1">{selectedPatient.doctor}</p>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1">
                                <FileText className="w-4 h-4 mr-2" />
                                View Records
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Edit Details
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
