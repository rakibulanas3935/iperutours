"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import { useUserContext } from "@/context/userContext";
import CommonLoader from "@/component/common/CommonLoader";
import { useSubCategoryContext } from "@/context/subCategoryContext";
import CreateSubCategoryModal from "./component/CreateSubCategoryModal";
import EditSubCategoryModal from "./component/EditSubCategoryModal";
import ViewModal from "@/app/(dashboard)/component/ViewModal";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";


const AddSubCategory = () => {
  const { subCategorys, subCategorysLoading, setReload } = useSubCategoryContext();
  const { user } = useUserContext();
  const [, deleteProject] = useAxiosPost({}, "patch");

  const [showConfirm, setShowConfirm] = useState(false);
  const [createSubCategoryModalOpen, setCreateSubCategoryModalOpen] = useState(false);
  const [editSubCategoryModalOpen, setEditSubCategoryModalOpen] = useState(false);
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
      `http://localhost:3000/api/v1/subcategories/delete/${selectedId}`,
      { user: { _id: user?._id } },
      () => {
        setReload(prev => !prev);
        setShowConfirm(false);
      },
      true
    );

  };

  if (subCategorysLoading) return <CommonLoader />;

  return (
    <div className="min-h-screen bg-neutral-background text-text-body p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-title">Sub Categories</h1>
          <button
            onClick={() => setCreateSubCategoryModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            <Plus className="w-5 h-5" /> Add Sub Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-line bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-neutral-background text-text-title text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Sl</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Sub Category</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-line">
              {subCategorys?.data?.map((subcategory, i) => (
                <tr
                  key={subcategory?._id}
                  className="hover:bg-neutral-background/60 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-text-body">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {subcategory?.category?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {subcategory?.name}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">

                    <button
                      onClick={() => {
                        setShowView(subcategory)
                      }}
                      className="inline-flex items-center justify-center bg-accent-teal hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setEditSubCategoryModalOpen(subcategory);
                      }}
                      className="inline-flex items-center justify-center bg-accent-yellow hover:bg-brand-primary text-text-title font-semibold rounded-md p-2 transition"
                    >
                      <Pencil size={18} />
                    </button>


                    <button
                      onClick={() => handleReject(subcategory?._id)}
                      className="inline-flex items-center justify-center bg-accent-pink hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {subCategorys?.data?.length === 0 && (
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

      <CreateSubCategoryModal open={createSubCategoryModalOpen}
        onClose={() => setCreateSubCategoryModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)} />
      <EditSubCategoryModal open={editSubCategoryModalOpen}
        subCategory={editSubCategoryModalOpen}
        onClose={() => setEditSubCategoryModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)} />

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAction}
        title="Reject this project?"
        description="This will reject the project. It will not be publicly visible."
      />

      <ViewModal
        open={showView}
        onClose={() => setShowView(false)}
        title="Sub Category Details"
        data={{
          subCategory: showView?.name,
          category: showView?.category?.name,
          createdAt: showView?.createdAt,
        }}
      />

    </div>
  );
};

export default AddSubCategory;
