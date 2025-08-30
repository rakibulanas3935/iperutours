"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
// import useAxiosPost from "@/app/utils/useAxiosPost";
// import ConfirmModal from "../../component/ConfirmModal";
// import { useUserContext } from "@/app/context/userContext";
// import { useProjectContext } from "@/app/context/projectContext";
import useAxiosPost from "@/utils/useAxiosPost";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";
import { useUserContext } from "@/context/userContext";

export default function ProjectsPage() {
  const { projects, loading, setReload } = useUserContext();
  const { user } = useUserContext();
  console.log('user',user)
  const [, updateApproved] = useAxiosPost({}, "patch");
  const [, deleteProject] = useAxiosPost({}, "delete");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'reject'

  const handleApproveReject = (id) => {
    // ✅ Immediate approval without modal
    updateApproved(
      `https://nova-next-gen-server.onrender.com/api/v1/projects/${id}/approve`,
      {
        user: {
          _id: user?._id,
        },
      },
      () => {
        setReload(true);
      },
      true
    );
  };

  const handleReject = (id) => {
    setSelectedId(id);
    setActionType("reject");
    setShowConfirm(true);
  };

  const confirmAction = () => {
    if (actionType === "reject") {
        deleteProject(
            `https://nova-next-gen-server.onrender.com/api/v1/projects/${selectedId}/reject`,
            {
                user: {
                    _id: user?._id,
                },
            },
            () => {
                setReload(true);
                setShowConfirm(false);
            },
            true
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Link
            href="/dashboard/projects/create"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <Plus className="w-4 h-4" /> Create New Project
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Project Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Created By</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Live Link</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {projects?.data?.projects?.map((project) => (
                <tr key={project?._id} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4">{project?.title}</td>
                  <td className="px-6 py-4">{project?.createdBy?.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href={project?.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Live Link
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {project?.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      href={`/projects/${project?._id}`}
                      className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
                    >
                      <Eye size={16} />
                    </Link>
                    {project?.isAdminProject ? (
                      <Link
                        href={`/dashboard/projects/${project?._id}/edit`}
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2"
                      >
                        <Pencil size={16} />
                      </Link>
                    ) : (
                      <button
                        disabled={true}
                        className="inline-flex items-center justify-center bg-yellow-500 opacity-50 cursor-not-allowed text-white rounded-md p-2"
                      >
                        <Pencil size={16} />
                      </button>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() => handleApproveReject(project?._id)}
                          disabled={project?.isApproved}
                          className={`inline-flex items-center justify-center rounded-md p-2 text-white ${
                            project?.isApproved
                              ? "bg-green-400 cursor-not-allowed opacity-50"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(project?._id)}
                          disabled={project?.isApproved}
                          className={`inline-flex items-center justify-center rounded-md p-2 text-white ml-2 ${
                            project?.isApproved
                              ? "bg-red-400 cursor-not-allowed opacity-50"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {projects?.data?.projects?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-400">
                    No projects found.
                  </td>
                </tr>
              )}

              <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmAction}
                title="Reject this project?"
                description="This will reject the project. It will not be publicly visible."
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
