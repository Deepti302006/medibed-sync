import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MedicineView = () => {
  const medicines = [
    { id: 1, name: "Paracetamol 500mg", category: "Analgesic", stock: 45, expiry: "2025-06-15", supplier: "PharmaCorp" },
    { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", stock: 78, expiry: "2025-08-20", supplier: "MediSupply" },
    { id: 3, name: "Insulin Injection", category: "Diabetes", stock: 23, expiry: "2025-04-30", supplier: "HealthPro" },
    { id: 4, name: "Aspirin 75mg", category: "Antiplatelet", stock: 150, expiry: "2026-02-10", supplier: "PharmaCorp" },
    { id: 5, name: "Metformin 500mg", category: "Diabetes", stock: 92, expiry: "2025-09-18", supplier: "MediSupply" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Medicine Stock Management</h2>
          <p className="text-muted-foreground">Track and manage hospital pharmacy inventory</p>
        </div>
        <Button className="bg-gradient-primary shadow-medical">
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search medicines..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Medicine Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Expiry Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Supplier</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{medicine.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{medicine.category}</td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      medicine.stock < 50 ? "text-danger" : 
                      medicine.stock < 100 ? "text-warning" : "text-success"
                    }`}>
                      {medicine.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{medicine.expiry}</td>
                  <td className="py-4 px-4 text-muted-foreground">{medicine.supplier}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Issue</Button>
                    </div>
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
