import React, { useState } from 'react';
import { Search, Bell, Eye, Check } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 bg-primary text-foreground text-sm font-medium rounded-md hover:bg-muted-foreground-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

const OutlineButton: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-3 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const MatchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatches, setSelectedMatches] = useState(new Set());
  const [viewMode, setViewMode] = useState("table");

  const matchData = [
    {
      id: 1,
      internName: "Sophia Clark",
      skills: "Python, Data Analysis",
      supervisorName: "Dr. Emily Carter",
      department: "Research",
      matchScore: 95
    },
    {
      id: 2,
      internName: "Ethan Bennett",
      skills: "Java, Mobile Development",
      supervisorName: "Mr. David Lee",
      department: "Engineering",
      matchScore: 92
    },
    {
      id: 3,
      internName: "Olivia Harper",
      skills: "UI/UX Design, Figma",
      supervisorName: "Ms. Sarah Jones",
      department: "Design",
      matchScore: 90
    },
    {
      id: 4,
      internName: "Noah Foster",
      skills: "Marketing Strategy, SEO",
      supervisorName: "Mr. Michael Brown",
      department: "Marketing",
      matchScore: 88
    },
    {
      id: 5,
      internName: "Ava Mitchell",
      skills: "Financial Modeling, Excel",
      supervisorName: "Ms. Laura White",
      department: "Finance",
      matchScore: 85
    }
  ];

  const filteredMatches = matchData.filter(match =>
    match.internName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.supervisorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectMatch = (id:number) => {
    const newSelected = new Set(selectedMatches);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMatches(newSelected);
  };

  const selectAllMatches = () => {
    if (selectedMatches.size === filteredMatches.length) {
      setSelectedMatches(new Set());
    } else {
      setSelectedMatches(new Set(filteredMatches.map(match => match.id)));
    }
  };

  const getScoreBadgeVariant = (score:number) => {
    if (score >= 90) return "success";
    if (score >= 85) return "warning";
    return "default";
  };

  const handleApproveMatches = () => {
    if (selectedMatches.size > 0) {
      alert(`Approved ${selectedMatches.size} match(es)!`);
      setSelectedMatches(new Set());
    } else {
      alert("Please select matches to approve.");
    }
  };

  return (
    <div className=" bg-card rounded-2xl">

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Results</h1>
          <p className="text-gray-600">Review generated matches and approve them to proceed.</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex items-center justify-end mb-6 space-x-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Filter matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
            />
          </div>
          <div>
            <Button onClick={handleApproveMatches}>
              <Check className="w-5 h-5 mr-2" />
              Approve Matches
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredMatches.length} of {matchData.length} matches
            {selectedMatches.size > 0 && (
              <span className="ml-2 text-primary">
                ({selectedMatches.size} selected)
              </span>
            )}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedMatches.size === filteredMatches.length && filteredMatches.length > 0}
                    onChange={selectAllMatches}
                    className="w-4 h-4 text-primary rounded border-muted-foreground-50 focus:ring-primary/50"
                  />
                </TableHead>
                <TableHead>Intern Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Supervisor Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Match Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <TableRow 
                  key={match.id}
                  className={selectedMatches.has(match.id) ? "bg-primary/30" : ""}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedMatches.has(match.id)}
                      onChange={() => toggleSelectMatch(match.id)}
                      className="w-4 h-4 text-primary rounded border-muted-foreground focus:ring-primary/50"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    {match.internName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {match.skills}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {match.supervisorName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {match.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getScoreBadgeVariant(match.matchScore)}>
                      {match.matchScore}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-muted-foreground-50 mt-4">
            <p className="text-muted-foreground">No matches found. Try adjusting your search terms.</p>
          </div>
        )}
      </main>
    </div>
  );
};
