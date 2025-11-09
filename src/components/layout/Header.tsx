import { Bell, Search, Settings, User, LogOut, Menu, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients, staff, medicines..."
              className="pl-10 bg-secondary/50 border-none focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Icon for Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-popover">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {[
                  {
                    title: "Low Stock Alert",
                    desc: "Paracetamol 500mg is running low",
                    time: "5 min ago",
                    type: "warning",
                  },
                  {
                    title: "New Patient Admission",
                    desc: "John Doe admitted to ICU",
                    time: "15 min ago",
                    type: "info",
                  },
                  {
                    title: "Emergency Case",
                    desc: "Bed 12 requires immediate attention",
                    time: "1 hour ago",
                    type: "urgent",
                  },
                ].map((notif, idx) => (
                  <DropdownMenuItem key={idx} className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.desc}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">Dr. Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Administrator
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')} className="text-primary">
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
