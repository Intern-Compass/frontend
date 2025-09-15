'use client';

import { useState } from 'react';
import { Check, Upload, X, File as FileIcon} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

import projects from "@/components/features/intern/milestones/data.json";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: {
    id: string;
    name: string;
    date: string;
    assigner: string;
    status: string;
    onClick?: () => void;
  };
}

export const ProjectModal = ({ project }: ProjectModalProps) => {
 // React useState hooks for managing component state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Handle file selection via input
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle drag over event
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Handle drag leave event
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
  };

  // Format file size for display
 const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{project.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Assigned by {project.assigner}</span>
            <span>Due: {project.date}</span>
          </div>
        </div>
        <Badge
          className={cn(
            "capitalize font-medium rounded-3xl",
            project.status === "inProgress" && "bg-warning-light text-warning-dark",
            project.status === "overdue" && "bg-error-light text-error-dark",
            project.status === "completed" && "bg-success-light text-success-dark"
          )}
        >
          {project.status === "inProgress" ? "In Progress" : project.status}
        </Badge>
      </div>

      {/* Project Description */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-3">Project Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          Learn how to integrate with RESTful APIs and implement comprehensive testing strategies. {"You'll"} work with real APIs, 
          handle authentication, error handling, and write unit and integration tests.
        </p>
      </div>

      {/* Project Progress */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-4">Project Progress</h2>
        
        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="flex w-full items-center gap-4">
            <div className='w-full space-y-3'>
                <div className="flex-1 bg-success-base h-2 rounded-lg"></div>
                <span className=" text-gray-900">Materials Downloaded</span>
            </div>
            <div className='w-full space-y-3'>
                <div className="flex-1 bg-primary/70 h-2 rounded-lg"></div>
                <span className=" text-primary/50">Project Submitted</span>
            </div>
            <div className='w-full space-y-3'>
                <div className="flex-1 bg-muted-foreground-50 h-2 rounded-lg"></div>
                <span className=" text-muted-foreground">Project Approved</span>
            </div>
          </div>
        </div>

      </div>

      {/* Resources & Materials */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-4">Resources & Materials</h2>
        
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">API Testing Guide</h3>
            <div className="flex items-center gap-2 text-success-base">
              <span className="text-sm font-medium">Downloaded</span>
              <Check size={16} className="text-success-base" />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Your Work */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Submit Your Work</h2>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            // Show uploaded file
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileIcon size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title="Remove file"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          ) : (
            // Show upload area
            <div className="flex flex-col items-center justify-center text-center">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
              />
              <label
                htmlFor="file-upload"
                className="transition-colors cursor-pointer"
              >
                <Upload size={52} className="text-muted-foreground-50 mb-4" />
                    <p className="text-sm text-muted-foreground mb-1">Upload</p>
              </label>
            </div>
          )}
        </div>

        {uploadedFile && (
          <div className="mt-4 flex justify-end">
            <button className="bg-primary text-foreground font-bold px-6 py-2 rounded-3xl hover:bg-muted-foreground transition-colors cursor-pointer">
              Submit
            </button>
          </div>
        )}
      
      </div>
    </div>
  );
}