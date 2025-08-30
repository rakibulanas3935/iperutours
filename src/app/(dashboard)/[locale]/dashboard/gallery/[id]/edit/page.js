'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/shared/Button';
import useAxiosGet from '@/app/utils/useAxiosGet';
import { useParams } from 'next/navigation';
import { useEventContext } from '@/app/context/eventContext';
import RichTextEditor from '@/app/(dashboard)/component/RichTextEditor';
import useAxiosPostFile from '@/app/utils/useAxiosPostFile';
import { useProjectContext } from '@/app/context/projectContext';
import { useUserContext } from '@/app/context/userContext';

export default function EditProjectPage() {
    const { setReload } = useProjectContext()
    const {user} =useUserContext()
    const [singleProject, getSingleProject, loading, setSingleProject] = useAxiosGet()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        eventTime: '',
        liveLink: '',
        projectImage: null,
        description: '',
    });

    const [, updateProject, loadingUpdate] = useAxiosPostFile({}, 'patch');


    useEffect(() => {
        getSingleProject(`https://nova-next-gen-server.onrender.com/api/v1/projects/${id}`, (res) => {
            const project = res?.data?.project;
            setFormData({
                title: project.title || '',

                liveLink: project.liveLink || '',
                projectImage: null,
                description: project.description || '',
            });
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('liveLink', formData.liveLink);
        data.append('description', formData.description);
        if (formData.projectImage) data.append('projectImage', formData.projectImage);
        if (user?._id) {
            data.append('createdBy', user?._id);
        }
        updateProject(`https://nova-next-gen-server.onrender.com/api/v1/projects/${id}`, data, () => {
            setReload(true)
        }, true);
    };



    return (
        <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Create Event
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    {/* Meeting Link */}
                    <input
                        type="text"
                        placeholder="Meeting Link"
                        value={formData.liveLink}
                        onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    {/* Rich Text Description */}
                    <RichTextEditor
                        value={formData.description}
                        onChange={(val) => setFormData({ ...formData, description: val })}
                    />


                    {/* File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, projectImage: e.target.files[0] })}
                        className="w-full text-sm file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-lg"
                    />

                    {/* Submit Button */}
                    <Button className='w-full cursor-pointer' type="submit" disabled={loadingUpdate}>
                        {loadingUpdate ? 'updaitng...' : 'Update Event'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
