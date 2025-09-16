"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import { useUserContext } from "@/context/userContext";
import CommonLoader from "@/component/common/CommonLoader";
import ViewModal from "@/app/(dashboard)/component/ViewModal";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";

import { useTourContext } from "@/context/tourContext";
import AddTourModal from "./component/AddTourModal";
import EditTourModal from "./component/EditTourModal";


const AddTour = () => {
  const { tours, toursLoading, setReload } = useTourContext();
  const { user } = useUserContext();
  const [, deleteProject] = useAxiosPost({}, "patch");

  const [showConfirm, setShowConfirm] = useState(false);
  const [createNewTourModalOpen, setCreateNewTourModalOpen] = useState(false);
  const [editNewTourModalOpen, setEditNewTourModalOpen] = useState(false);
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
      `http://localhost:3000/api/v1/tours/delete/${selectedId}`,
      { user: { _id: user?._id } },
      () => {
        setReload(prev => !prev);
        setShowConfirm(false);
      },
      true
    );

  };

  if (toursLoading) return <CommonLoader />;

  console.log('tours',tours)
  return (
    <div className="min-h-screen bg-neutral-background text-text-body p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-title">All Tours</h1>
          <button
            onClick={() => setCreateNewTourModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            <Plus className="w-5 h-5" /> Create New Tour
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-line bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-neutral-background text-text-title text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Sl</th>
                <th className="px-6 py-3 text-left font-semibold">Tours</th>
                <th className="px-6 py-3 text-left font-semibold">Base Price</th>
                <th className="px-6 py-3 text-left font-semibold">Banner</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-line">
              {tours?.data?.map((tour, i) => (
                <tr
                  key={tour?._id}
                  className="hover:bg-neutral-background/60 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-text-body">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {tour?.title}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    US$ {tour?.pricing?.basePrice}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-body">
                    {/* {?.name} */}
                    <img src={tour?.images[0]} alt={tour?.title} className="w-32 h-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">

                    <button
                      onClick={() => {
                        setShowView(tour)
                      }}
                      className="inline-flex items-center justify-center bg-accent-teal hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setEditNewTourModalOpen(tour);
                      }}
                      className="inline-flex items-center justify-center bg-accent-yellow hover:bg-brand-primary text-text-title font-semibold rounded-md p-2 transition"
                    >
                      <Pencil size={18} />
                    </button>


                    <button
                      onClick={() => handleReject(tour?._id)}
                      className="inline-flex items-center justify-center bg-accent-pink hover:bg-brand-secondary text-white rounded-md p-2 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {tours?.data?.length === 0 && (
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

     
  
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAction}
        title="Reject this project?"
        description="This will reject the project. It will not be publicly visible."
      />
      <AddTourModal
        open={createNewTourModalOpen}
        onClose={() => setCreateNewTourModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)}
      />
      <EditTourModal
        open={editNewTourModalOpen}
        tour={editNewTourModalOpen}
        onClose={() => setEditNewTourModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)}
      />
      {/* <AddTourModal
        open={!!editNewTourModalOpen}
        tour={editNewTourModalOpen}
        onClose={() => setEditNewTourModalOpen(false)}
        onSuccess={() => setReload(prev => !prev)}
      /> */}
      <ViewModal
        open={showView}
        onClose={() => setShowView(false)}
        title="Place Details"
        data={{
          // image: showView?.images[0],
          TourTitle: showView?.title,
          placeDescription: showView?.description,
          createdAt: showView?.createdAt,
        }}
      />

    </div>
  );
};

export default AddTour;
