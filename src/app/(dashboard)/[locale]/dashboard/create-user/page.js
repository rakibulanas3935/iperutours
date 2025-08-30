'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash, Eye, Plus } from 'lucide-react';
import useAxiosPost from '@/app/utils/useAxiosPost';
import ConfirmModal from '../../component/ConfirmModal';
import { useBlogContext } from '@/app/context/blogContext';
import { useUserContext } from '@/app/context/userContext';



export default function BlogPage() {
    const { users, setReload } = useUserContext()
    console.log(users)
    const [, deleteEvent,] = useAxiosPost({}, "delete");


    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        deleteEvent(`https://nova-next-gen-server.onrender.com/api/v1/users/${selectedId}`, {}, (res) => {
            setReload(true)
        }, true)
    };

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">ALl User List</h1>
                    <Link
                        href="/dashboard/create-user/new-user"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        <Plus className="w-4 h-4" /> Create User
                    </Link>
                </div>


                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-white/10 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">User Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>


                                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {users?.data?.users?.map((user) => (
                                <tr key={user?._id} className="hover:bg-white/10 transition">
                                    <td className="px-6 py-4">{user?.name}</td>
                                    <td className="px-6 py-4">
                                        {user?.userName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.email}
                                    </td>

                                    <td className="px-6 py-4 text-center space-x-2">


                                        <button
                                            onClick={() => handleDelete(user?._id)}
                                            className="inline-flex items-center justify-center cursor-pointer bg-red-400 hover:bg-red-600 text-white rounded-md p-2"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {users?.data?.blogs?.length === 0 && (
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
