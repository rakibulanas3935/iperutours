'use client';

import { useState } from 'react';
import Button from '@/app/components/shared/Button';
import RichTextEditor from '../../../component/RichTextEditor';
import useAxiosPostFile from '@/app/utils/useAxiosPostFile';
import { useBlogContext } from '@/app/context/blogContext';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    blogImage: null,
    description: '',
  });

  const [, postEvent, loading] = useAxiosPostFile();
  const{setReload}=useBlogContext()
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.blogImage) data.append('blogImage', formData.blogImage);

    postEvent('https://nova-next-gen-server.onrender.com/api/v1/blogs', data, () => {
      setFormData({
        title: '',
        blogImage: null,
        description: '',
      });
      setReload(true)
    }, true);
  };


  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Add New Blog
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

          {/* Rich Text Description */}
          <RichTextEditor
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, blogImage: e.target.files[0] })}
            className="w-full text-sm file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-lg"
          />

          {/* Submit Button */}
          <Button className='w-full' type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add New Blog'}
          </Button>
        </form>
      </div>
    </div>
  );
}
