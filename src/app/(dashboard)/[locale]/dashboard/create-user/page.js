"use client";

import { useState } from "react";
import { Pencil, Eye, Plus, Trash } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";
import { useCategoryContext } from "@/context/categoryContext";
import CommonLoader from "@/component/common/CommonLoader";
import ViewModal from "@/app/(dashboard)/component/ViewModal";
import EditCategoryModal from "./component/EditCategoryModal";
import { useUserContext } from "@/context/userContext";
import CreateUserModal from "./component/CreateCategoryModal";

export default function CreateUserPage() {
  const { categorys, categorysLoading, setReload } = useCategoryContext();
  const {users, getAllusers}=useUserContext()
  const [, updateApproved] = useAxiosPost({}, "patch");
  const [, deleteProject] = useAxiosPost({}, "patch");

  const [showConfirm, setShowConfirm] = useState(false);
  const [createUserModalOpen, setcreateUserModalOpen] = useState(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleReject = (id) => {
    setSelectedId(id);
    setActionType("reject");
    setShowConfirm(true);
  };

  const confirmAction = () => {

    deleteProject(
      `http://localhost:3000/api/v1/categories/delete/${selectedId}`,
      {},
      () => {
        setReload(prev => !prev);
        setShowConfirm(false);
      },
      true
    );

  };

  if (categorysLoading) return <CommonLoader />;

  return (
    <div className="min-h-screen bg-neutral-background text-text-body p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-title">Person Type</h1>
          <button
            onClick={() => setcreateUserModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            <Plus className="w-5 h-5" /> User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-line bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-neutral-background text-text-title text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Sl</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">User Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-line">
              {users?.data?.users?.map((user, i) => (
                <tr
                  key={user?._id}
                  className="hover:bg-neutral-background/60 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-text-body">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {user?.firstName} {user?.lastName||user?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {user?.userName}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {/* View */}
                    <button
                      onClick={() => {
                        setShowView(user)
                      }}
                      className="inline-flex items-center justify-center bg-accent-teal hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Edit */}
                    {/* <button
                      onClick={() => {
                        setEditCategoryModalOpen(user);
                      }}
                      className="inline-flex items-center justify-center bg-accent-yellow hover:bg-brand-primary text-text-title font-semibold rounded-md p-2 transition"
                    >
                      <Pencil size={18} />
                    </button> */}

                    {/* Delete */}
                    <button
                      onClick={() => handleReject(user?._id)}
                      className="inline-flex items-center justify-center bg-accent-pink hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {users?.data?.users?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditCategoryModal
        open={editCategoryModalOpen}
        category={editCategoryModalOpen}
        onClose={() => setEditCategoryModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)} // refresh list after edit
      />

      <CreateUserModal
        open={createUserModalOpen}
        onClose={() => setcreateUserModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)} // Refresh category list on success
      />

      <ViewModal
        open={showView}
        onClose={() => setShowView(false)}
        title="User Details"
        data={{
          name: `${showView?.firstName} ${showView?.lastName}`,
          userName: showView?.userName,
          email: showView?.email
        }
        }
      />

      {/* Confirm Modal */}
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAction}
        title="Reject this project?"
        description="This will reject the project. It will not be publicly visible."
      />
    </div>
  );
}
