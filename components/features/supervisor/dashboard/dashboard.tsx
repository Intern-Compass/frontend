"use client";

import { getUserDetails, refreshToken } from "@/lib/api/auth";
import axiosInstance from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";
import { Home, ThumbsUp, Reply, Clock } from "lucide-react";

export const Dashboard = () => {
  const {
    isPending,
    isError,
    data: supervisor,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  const { data } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: refreshToken
  });

  return (
    <div>
      <div className="flex items-center space-x-2 mx-8 pt-3">
        <Home size={18} strokeWidth={2} color="black" />
        <div className="font-semibold text-xl"> Dashboard</div>
      </div>

      <h2 className="mx-8 pt-7 font-medium">
        Welcome{supervisor?.firstname ? `, ${supervisor.firstname}.` : "."}
      </h2>
      <h3 className="mx-8 font-normal ">What are you doing today?</h3>
      <p className="mx-8 font-normal pt-5">Overview</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-8">
        <div className="flex flex-col border-1 my-4 w-full h-auto rounded-lg">
          <span className="text-black font-bold pt-6 ml-4">256</span>
          <span className="text-gray-600 font-normal pb-6 ml-4">
            Assigned Intern(s)
          </span>
        </div>
        <div className="flex flex-col border-1 my-4 w-full h-auto rounded-lg">
          <span className="text-blue-600 font-bold pt-6 ml-4">48</span>
          <span className="text-gray-600 font-normal pb-6 ml-4">
            In progress task(s)
          </span>
        </div>
        <div className="flex flex-col border-1 my-4 w-full h-auto rounded-lg">
          <span className="text-red-700 font-bold pt-6 ml-4">11</span>
          <span className="text-gray-600 font-normal pb-6 ml-4">Overdue</span>
        </div>
        <div className="flex flex-col border-1 my-4 w-full h-auto rounded-lg">
          <span className="text-green-600 font-bold pt-6 ml-4">89</span>
          <span className="text-gray-600 font-normal pb-6 ml-4">
            Completed task(s)
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex-1 bg-white rounded-2xl shadow p-4 border-1 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold mb-4">Community</h2>
              <a
                href="#"
                className="text-sm text-yellow-700 font-bold hover:underline"
              >
                View all
              </a>
            </div>

            <div className="mb-4 border-b pb-4 flex flex-row space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm flex-shrink-0">
                OD
              </div>
              <div>
                <div className="flex flex-row gap-5 items-center">
                  <p className="font-semibold">Opemipo Ashiru</p>
                  <span className="flex flex-row text-xs">
                    <Clock size={15} />1 day ago
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Supervisor, Information Technology
                </p>
                <h3 className="font-bold mt-2">Accessibility in Design</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Attached below is a link to an article on accessibility in
                  design, this will help you gain knowledge in creating
                  user-centric...
                </p>
                <div className="flex items-center gap-5 text-sm mt-2">
                  <span className="flex flex-row gap-2">
                    <ThumbsUp size={20} className="text-red-500" /> 5
                  </span>
                  <span className="flex flex-row gap-2">
                    <Reply size={20} className="text-gray-400" /> 1 reply
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm flex-shrink-0">
                OD
              </div>
              <div>
                <div className="flex flex-row gap-5 items-center">
                  <p className="font-semibold">Opemipo Ashiru</p>
                  <span className="flex flex-row text-xs">
                    <Clock size={15} />1 day ago
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Supervisor, Information Technology
                </p>
                <h3 className="font-bold mt-2">Accessibility in Design</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Attached below is a link to an article on accessibility in
                  design, this will help you gain knowledge in creating
                  user-centric...
                </p>
                <div className="flex items-center gap-5 text-sm mt-2">
                  <span className="flex flex-row gap-2">
                    <ThumbsUp size={20} className="text-red-500" /> 5
                  </span>
                  <span className="flex flex-row gap-2">
                    <Reply size={20} className="text-gray-400" /> 1 reply
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Supervisors Inbox</h2>

            <div className="mb-4 border-b pb-3">
              <div></div>
              <p className="font-bold">
                {" "}
                You’ve been assigned an Intern{" "}
                <span className="bg-yellow-100 text-[#202020] text-xs font-semibold ml-2 px-2 py-1 rounded-full">
                  New
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Benita Ajagunna has been assigned to you. UI/UX Team
              </p>
              <p className="text-xs text-gray-400 mt-1 flex flex-row gap-1">
                <Clock size={15} />2 mins ago
              </p>
            </div>

            <div className="mb-4 border-b pb-3">
              <p className="font-bold">
                {" "}
                Project Submitted{" "}
                <span className="bg-yellow-100 text-[#202020] text-xs font-semibold ml-2 px-2 py-1 rounded-full">
                  New
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Benita Ajagunna submitted Database Schema for review
              </p>
              <p className="text-xs text-gray-400 mt-1 flex flex-row gap-1">
                <Clock size={15} />4 mins ago
              </p>
            </div>

            <div>
              <p className="font-bold"> Internship Ending in 2 Weeks</p>
              <p className="text-sm text-gray-600">
                Buhari Riko’s Internship is ending in two weeks
              </p>
              <p className="text-xs text-gray-400 mt-1 flex flex-row gap-1">
                <Clock size={15} />6 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
