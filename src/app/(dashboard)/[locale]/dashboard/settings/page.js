"use client";

import { useState } from "react";
import { Pencil, Eye, Plus, Trash } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import ConfirmModal from "@/app/(dashboard)/component/ConfirmModal";
import CommonLoader from "@/component/common/CommonLoader";
import ViewModal from "@/app/(dashboard)/component/ViewModal";
import AddSettingModal from "./component/AddSettingModal";
import { useSettingContext } from "@/context/settingContext";
import EditSettingModal from "./component/EditSettingModal";

export default function SettingPage() {
    const { settings, settingsLoading, setReload } = useSettingContext();

    const [, updateApproved] = useAxiosPost({}, "patch");
    const [, deleteProject] = useAxiosPost({}, "patch");

    const [showConfirm, setShowConfirm] = useState(false);
    const [createSettignModalOpen, setCreateSettignModalOpen] = useState(false);
    const [editSettignModalOpen, setEditSettignModalOpen] = useState(false);
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

    if (settingsLoading) return <CommonLoader />;

    console.log("settings", settings)

    return (
        <div className="min-h-screen bg-neutral-background text-text-body p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-text-title">Settings</h1>
                    <button
                        onClick={() => setCreateSettignModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" /> Add New Settings
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-neutral-line bg-white shadow">
                    <table className="min-w-full">
                        <thead className="bg-neutral-background text-text-title text-sm">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">Name</th>
                                <th className="px-6 py-3 text-left font-semibold">Logo</th>
                                <th className="px-6 py-3 text-left font-semibold">Update</th>
                                <th className="px-6 py-3 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-line">

                            <tr
                                className="hover:bg-neutral-background/60 transition-colors"
                            >

                                <td className="px-6 py-4 font-medium text-text-body">
                                    {settings?.data?.siteName || "Ip Tours"}
                                </td>


                                <td className="px-6 py-4 font-medium text-text-body">
                                    {/* {?.name} */}
                                    <img src={settings?.data?.logoUrl} className="w-32 h-20 object-cover rounded-md" />

                                </td>
                                <td className="px-6 py-4 font-medium text-text-body">
                                    {settings?.data?.updatedAt}

                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => {
                                            setShowView(settings)
                                        }}
                                        className="inline-flex items-center justify-center bg-accent-teal hover:bg-brand-secondary text-white rounded-md p-2 transition"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditSettignModalOpen(settings?.data);
                                        }}
                                        className="inline-flex items-center justify-center bg-accent-yellow hover:bg-brand-primary text-text-title font-semibold rounded-md p-2 transition"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleReject(user?._id)}
                                        className="inline-flex items-center justify-center bg-accent-pink hover:bg-brand-secondary text-white rounded-md p-2 transition"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>


            <AddSettingModal
                open={createSettignModalOpen}
                onClose={() => setCreateSettignModalOpen(false)}
                onSuccess={() => setReload(prev => !prev)}
            />
            <EditSettingModal
                open={editSettignModalOpen}
                onClose={() => setEditSettignModalOpen(false)}
                onSuccess={() => setReload(prev => !prev)}
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
