import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Bell, Shield, Palette, Database } from "lucide-react";

export const SettingsView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your hospital system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" defaultValue="john.doe@hospital.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" defaultValue="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="admin">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Hospital Tab */}
        <TabsContent value="hospital" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Hospital Information</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input id="hospitalName" placeholder="Enter hospital name" defaultValue="MediCare Hospital" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" defaultValue="123 Medical St, Healthcare City" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" defaultValue="Healthcare City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="Enter ZIP code" defaultValue="12345" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospitalPhone">Phone</Label>
                  <Input id="hospitalPhone" type="tel" placeholder="Enter phone" defaultValue="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospitalEmail">Email</Label>
                  <Input id="hospitalEmail" type="email" placeholder="Enter email" defaultValue="info@medicare.com" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Notification Preferences</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: "Email Notifications", description: "Receive email alerts for important updates" },
                { label: "SMS Notifications", description: "Get SMS alerts for critical events" },
                { label: "Patient Admission Alerts", description: "Notify when new patients are admitted" },
                { label: "Low Stock Alerts", description: "Alert when medicine stock is low" },
                { label: "Appointment Reminders", description: "Receive reminders for upcoming appointments" },
                { label: "System Updates", description: "Get notified about system maintenance and updates" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={index < 4} />
                  </div>
                  {index < 5 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Security Settings</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Appearance Settings</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Display more content in less space</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">System Settings</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="mm/dd/yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 Hour</SelectItem>
                    <SelectItem value="24h">24 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Data Management</h4>
                <div className="flex gap-2">
                  <Button variant="outline">Backup Database</Button>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-danger">Danger Zone</h4>
                <Button variant="destructive">Clear All Data</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
