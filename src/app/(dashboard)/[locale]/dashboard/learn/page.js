'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash, Eye, Plus } from 'lucide-react';
import useAxiosPost from '@/app/utils/useAxiosPost';
import ConfirmModal from '../../component/ConfirmModal';
import { useBlogContext } from '@/app/context/blogContext';
import { useLearnContext } from '@/app/context/learnContext';



export default function LearnPage() {
    const { learn, loading, setReload } = useLearnContext()
    const [, deleteEvent,] = useAxiosPost({}, "delete");


    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        deleteEvent(`https://nova-next-gen-server.onrender.com/api/v1/learn/${selectedId}`, {}, (res) => {
            setReload(true)
        }, true)
    };

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Learns Configuration</h1>
                    <Link
                        href="/dashboard/learn/create"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        <Plus className="w-4 h-4" /> Create resources
                    </Link>
                </div>


                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-white/10 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Time</th>
                               
                                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {learn?.data?.learns?.map((learn) => (
                                <tr key={learn?._id} className="hover:bg-white/10 transition">
                                    <td className="px-6 py-4">{learn?.title}</td>
                                    <td className="px-6 py-4">
                                        {new Date(learn?.createdAt).toLocaleString()}
                                    </td>
                                   
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <Link
                                            href={`/dashboard/learn/${learn?._id}`}
                                            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={`/dashboard/learn/${learn?._id}/edit`}
                                            className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(learn?._id)}
                                            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {learn?.data?.learns?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-6 text-center text-gray-400">
                                        No events found.
                                    </td>
                                </tr>
                            )}

                           
                        </tbody>
                    </table>
                </div>
 <ConfirmModal
                                open={showConfirm}
                                onClose={() => setShowConfirm(false)}
                                onConfirm={confirmDelete}
                                title="Delete this event?"
                                description="This action is permanent and cannot be undone."
                            />

            </div>
        </div>
    );
}
