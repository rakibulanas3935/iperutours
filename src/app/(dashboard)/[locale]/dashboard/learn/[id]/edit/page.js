'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/shared/Button';
import useAxiosPost from '@/app/utils/useAxiosPost';
import useAxiosGet from '@/app/utils/useAxiosGet';
import { useParams } from 'next/navigation';
import { useEventContext } from '@/app/context/eventContext';
import RichTextEditor from '@/app/(dashboard)/component/RichTextEditor';
import { useLearnContext } from '@/app/context/learnContext';

export default function EditLearnPage() {
  const { setReload } = useLearnContext();
  const [singleLearn, getSingleLearn, loading] = useAxiosGet();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [, updateLearn, loadingUpdate] = useAxiosPost({}, 'patch');

  useEffect(() => {
    if (!id) return;
    getSingleLearn(`https://nova-next-gen-server.onrender.com/api/v1/learn/${id}`, (res) => {
      const learn = res?.data?.learn;
      setFormData({
        title: learn?.title || '',
        description: learn?.description || '',
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLearn(
      `https://nova-next-gen-server.onrender.com/api/v1/learn/${id}`,
      formData,
      () => {
        setReload(true);
      },
      true
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Edit Learning Resource
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <RichTextEditor
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
          />

          <Button className="w-full" type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? 'Updating...' : 'Update Resource'}
          </Button>
        </form>
      </div>
    </div>
  );
}
