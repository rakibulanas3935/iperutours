"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import { useUserContext } from "@/context/userContext";
import CommonLoader from "@/component/common/CommonLoader";
import { useSubCategoryContext } from "@/context/subCategoryContext";
import ViewModal from "@/app/(dashboard)/component/ViewModal";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";
import AddPlaceModal from "./component/AddPlaceModal";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import EditPlaceModal from "./component/EditPlaceModal";


const AddSubCategory = () => {
  const { newPlace, newPlaceLoading, setReload } = useNewPlaceContext();
  const { user } = useUserContext();
  const [, deleteProject] = useAxiosPost({}, "patch");

  const [showConfirm, setShowConfirm] = useState(false);
  const [createNewPlaceModalOpen, setCreateNewPlaceModalOpen] = useState(false);
  const [editNewPlaceModalOpen, setEditNewPlaceModalOpen] = useState(false);
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
      `http://localhost:3000/api/v1/places/delete/${selectedId}`,
      { user: { _id: user?._id } },
      () => {
        setReload(prev => !prev);
        setShowConfirm(false);
      },
      true
    );

  };

  console.log('newPlace',newPlace)
  if (newPlaceLoading) return <CommonLoader />;

  return (
    <div className="min-h-screen bg-neutral-background text-text-body p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-title">Place</h1>
          <button
            onClick={() => setCreateNewPlaceModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            <Plus className="w-5 h-5" /> Add New Place
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-line bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-neutral-background text-text-title text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Sl</th>
                <th className="px-6 py-3 text-left font-semibold">Place Name</th>
                <th className="px-6 py-3 text-left font-semibold">Banner</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-line">
              {newPlace?.data?.map((place, i) => (
                <tr
                  key={place?._id}
                  className="hover:bg-neutral-background/60 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-text-body">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {place?.placeName}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {/* {?.name} */}
                    <img src={place?.bannerImage} alt={place?.placeName} className="w-32 h-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">

                    <button
                      onClick={() => {
                        setShowView(place)
                      }}
                      className="inline-flex cursor-pointer items-center justify-center bg-accent-teal hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setEditNewPlaceModalOpen(place);
                      }}
                      className="inline-flex cursor-pointer items-center justify-center bg-accent-yellow hover:bg-brand-primary text-text-title font-semibold rounded-md p-2 transition"
                    >
                      <Pencil size={18} />
                    </button>


                    <button
                      onClick={() => handleReject(place?._id)}
                      className="inline-flex cursor-pointer items-center justify-center bg-accent-pink hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {newPlace?.data?.length === 0 && (
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

      <AddPlaceModal
        open={createNewPlaceModalOpen}
        onClose={() => setCreateNewPlaceModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)} /> 
      <EditPlaceModal
        open={editNewPlaceModalOpen}
        onClose={() => setEditNewPlaceModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)}
        place={editNewPlaceModalOpen}
        /> 



      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAction}
        title="Delete this Place ?"
        description="This will Delete the Place. It will not be publicly visible."
      />

      <ViewModal
        open={showView}
        onClose={() => setShowView(false)}
        title="Place Details"
        data={{
          image: showView?.bannerImage,
          placeName: showView?.placeName,
          placeDescription: showView?.description,
          createdAt: showView?.createdAt,
        }}
      />

    </div>
  );
};

export default AddSubCategory;
