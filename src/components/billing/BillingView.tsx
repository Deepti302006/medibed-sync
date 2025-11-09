import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, FileText, CreditCard, Download, Plus, Search, Filter } from "lucide-react";

const revenueStats = [
  { label: "Today's Revenue", value: "$12,450", change: "+12%", variant: "primary" as const },
  { label: "Pending Payments", value: "$8,320", change: "15 invoices", variant: "warning" as const },
  { label: "Monthly Revenue", value: "$284,500", change: "+8%", variant: "success" as const },
  { label: "Insurance Claims", value: "$45,200", change: "23 pending", variant: "danger" as const },
];

const invoices = [
  {
    id: "INV-2024-001",
    patient: "John Smith",
    date: "2024-01-15",
    amount: "$2,450",
    status: "paid",
    type: "Consultation",
  },
  {
    id: "INV-2024-002",
    patient: "Emma Wilson",
    date: "2024-01-14",
    amount: "$3,200",
    status: "pending",
    type: "Surgery",
  },
  {
    id: "INV-2024-003",
    patient: "Michael Brown",
    date: "2024-01-14",
    amount: "$1,850",
    status: "paid",
    type: "Lab Tests",
  },
  {
    id: "INV-2024-004",
    patient: "Sarah Davis",
    date: "2024-01-13",
    amount: "$5,600",
    status: "overdue",
    type: "Emergency",
  },
  {
    id: "INV-2024-005",
    patient: "James Johnson",
    date: "2024-01-13",
    amount: "$890",
    status: "paid",
    type: "Consultation",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "overdue":
      return "bg-danger/10 text-danger border-danger/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const BillingView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.variant}/10`}>
                <DollarSign className={`h-6 w-6 text-${stat.variant}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Invoice Management */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Invoice Management</h3>
            <p className="text-sm text-muted-foreground">Manage billing and payments</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Patient Name</label>
                    <Input placeholder="Enter patient name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="lab">Lab Tests</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <Button className="w-full">Generate Invoice</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Invoices Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.patient}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
                  <TableCell className="font-semibold">{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <CreditCard className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Payment Methods</h3>
          <div className="space-y-3">
            {["Cash", "Credit Card", "Debit Card", "Insurance", "Online Payment"].map((method) => (
              <div key={method} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-medium">{method}</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { patient: "John Smith", amount: "$2,450", time: "2 hours ago" },
              { patient: "Emma Wilson", amount: "$3,200", time: "5 hours ago" },
              { patient: "Michael Brown", amount: "$1,850", time: "1 day ago" },
              { patient: "Sarah Davis", amount: "$5,600", time: "2 days ago" },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.patient}</p>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
                <span className="font-semibold text-success">{transaction.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
