import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, FileText, Phone, Mail, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Patient = Tables<"patients">;
type PatientInsert = TablesInsert<"patients">;

const wards = ["ICU", "General", "Cardiac", "Pediatric", "Maternity"];
const statuses = ["Critical", "Stable", "Under Observation", "Recovering"];

export const PatientsView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");
  const [wardFilter, setWardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const loadPatients = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load patients", description: error.message, variant: "destructive" });
    else setPatients(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setHasSession(Boolean(data.session));
      if (data.session) void loadPatients();
      else setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setHasSession(Boolean(session));
      if (session) void loadPatients();
      else {
        setPatients([]);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAddPatient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasSession) {
      setIsAddOpen(false);
      toast({ title: "Sign in required", description: "Please sign in before adding patient records.", variant: "destructive" });
      navigate("/login");
      return;
    }
    setIsSaving(true);
    const formData = new FormData(event.currentTarget);
    const patient: PatientInsert = {
      name: String(formData.get("name") ?? "").trim(),
      age: Number(formData.get("age")),
      gender: String(formData.get("gender") ?? ""),
      contact: String(formData.get("contact") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim() || null,
      ward: String(formData.get("ward") ?? "General"),
      diagnosis: String(formData.get("diagnosis") ?? "").trim(),
      doctor: String(formData.get("doctor") ?? "").trim(),
      status: String(formData.get("status") ?? "Stable"),
      blood_group: String(formData.get("blood_group") ?? "").trim() || null,
    };
    const { data, error } = await supabase.from("patients").insert(patient).select().single();
    setIsSaving(false);
    if (error) {
      toast({ title: "Could not add patient", description: error.message, variant: "destructive" });
      return;
    }
    setPatients((current) => [data, ...current]);
    setIsAddOpen(false);
    toast({ title: "Patient added", description: `${data.name} was added to patient management.` });
  };

  const visiblePatients = patients.filter((patient) => {
    const query = search.toLowerCase();
    const matchesSearch = [patient.id, patient.name, patient.contact].some((value) => value.toLowerCase().includes(query));
    const matchesWard = wardFilter === "all" || patient.ward.toLowerCase() === wardFilter;
    const matchesStatus = statusFilter === "all-status" || patient.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesWard && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div><h2 className="mb-2 text-3xl font-bold text-foreground">Patient Management</h2><p className="text-muted-foreground">Manage patient records and medical history</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Button className="bg-gradient-primary shadow-medical" onClick={() => hasSession ? setIsAddOpen(true) : navigate("/login")}>
            <Plus className="mr-2 h-4 w-4" />{hasSession ? "Add New Patient" : "Sign In to Manage Patients"}
          </Button>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader><DialogTitle>Add New Patient</DialogTitle><DialogDescription>Save a patient record to the hospital database.</DialogDescription></DialogHeader>
            <form onSubmit={handleAddPatient} className="grid gap-4 pt-4 sm:grid-cols-2">
              <Input name="name" placeholder="Full name" required /><Input name="age" type="number" min="0" max="150" placeholder="Age" required />
              <Input name="gender" placeholder="Gender" required /><Input name="blood_group" placeholder="Blood group" />
              <Input name="contact" type="tel" placeholder="Contact number" required /><Input name="email" type="email" placeholder="Email address" />
              <Input name="diagnosis" placeholder="Diagnosis" required /><Input name="doctor" placeholder="Attending doctor" required />
              <Select name="ward" defaultValue="General"><SelectTrigger><SelectValue placeholder="Ward" /></SelectTrigger><SelectContent>{wards.map((ward) => <SelectItem key={ward} value={ward}>{ward}</SelectItem>)}</SelectContent></Select>
              <Select name="status" defaultValue="Stable"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent>{statuses.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select>
              <Button type="submit" disabled={isSaving} className="sm:col-span-2">{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Patient</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, ID, or contact..." className="pl-10" /></div>
          <Select value={wardFilter} onValueChange={setWardFilter}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Filter by ward" /></SelectTrigger><SelectContent><SelectItem value="all">All Wards</SelectItem>{wards.map((ward) => <SelectItem key={ward} value={ward.toLowerCase()}>{ward}</SelectItem>)}</SelectContent></Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger><SelectContent><SelectItem value="all-status">All Status</SelectItem>{statuses.map((status) => <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-border">{["Patient ID", "Name", "Age/Gender", "Ward", "Diagnosis", "Doctor", "Status", "Actions"].map((heading) => <th key={heading} className="px-4 py-4 text-left text-sm font-semibold text-foreground">{heading}</th>)}</tr></thead>
          <tbody>{isLoading ? <tr><td colSpan={8} className="py-12 text-center text-muted-foreground"><Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />Loading patient records...</td></tr> : visiblePatients.length === 0 ? <tr><td colSpan={8} className="py-12 text-center text-muted-foreground">No patients match the current filters.</td></tr> : visiblePatients.map((patient) => <tr key={patient.id} className="border-b border-border transition-colors hover:bg-secondary/30"><td className="px-4 py-4 font-mono text-sm text-muted-foreground">{patient.id}</td><td className="px-4 py-4 font-medium text-foreground">{patient.name}</td><td className="px-4 py-4 text-muted-foreground">{patient.age}Y / {patient.gender}</td><td className="px-4 py-4"><Badge variant="outline">{patient.ward}</Badge></td><td className="px-4 py-4 text-sm text-muted-foreground">{patient.diagnosis}</td><td className="px-4 py-4 text-sm text-muted-foreground">{patient.doctor}</td><td className="px-4 py-4"><Badge variant={patient.status === "Critical" ? "destructive" : patient.status === "Stable" ? "secondary" : "default"}>{patient.status}</Badge></td><td className="px-4 py-4"><Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}><Eye className="mr-1 h-4 w-4" />View</Button></td></tr>)}</tbody>
        </table></div>
      </Card>

      <Dialog open={Boolean(selectedPatient)} onOpenChange={(open) => !open && setSelectedPatient(null)}><DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto"><DialogHeader><DialogTitle>Patient Details</DialogTitle><DialogDescription>Complete medical record for {selectedPatient?.name}</DialogDescription></DialogHeader>{selectedPatient && <div className="space-y-6 pt-4"><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-muted-foreground">Patient ID</label><p className="mt-1 font-mono text-foreground">{selectedPatient.id}</p></div><div><label className="text-sm font-medium text-muted-foreground">Blood Group</label><p className="mt-1 font-semibold text-foreground">{selectedPatient.blood_group || "Not recorded"}</p></div><div><label className="text-sm font-medium text-muted-foreground">Age / Gender</label><p className="mt-1 text-foreground">{selectedPatient.age} Years / {selectedPatient.gender}</p></div><div><label className="text-sm font-medium text-muted-foreground">Admission Date</label><p className="mt-1 text-foreground">{new Date(selectedPatient.admission_date).toLocaleDateString()}</p></div></div><div className="space-y-3 border-t border-border pt-4"><h4 className="font-semibold text-foreground">Contact Information</h4><div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{selectedPatient.contact}</div>{selectedPatient.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{selectedPatient.email}</div>}</div><div className="space-y-3 border-t border-border pt-4"><h4 className="font-semibold text-foreground">Medical Details</h4><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-muted-foreground">Current Ward</label><div className="mt-1"><Badge variant="outline">{selectedPatient.ward}</Badge></div></div><div><label className="text-sm font-medium text-muted-foreground">Status</label><div className="mt-1"><Badge variant={selectedPatient.status === "Critical" ? "destructive" : "secondary"}>{selectedPatient.status}</Badge></div></div></div><div><label className="text-sm font-medium text-muted-foreground">Diagnosis</label><p className="mt-1 text-foreground">{selectedPatient.diagnosis}</p></div><div><label className="text-sm font-medium text-muted-foreground">Attending Doctor</label><p className="mt-1 text-foreground">{selectedPatient.doctor}</p></div></div><Button className="w-full"><FileText className="mr-2 h-4 w-4" />View Records</Button></div>}</DialogContent></Dialog>
    </div>
  );
};