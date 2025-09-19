"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, PlusCircle, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RichTextEditor from "@/app/(dashboard)/component/RichTextEditor";
import { useSettingContext } from "@/context/settingContext";

export default function EditSettingModal({ open, onClose, onSuccess }) {
  const { settings } = useSettingContext();

  const [formData, setFormData] = useState({
    siteName: "",
    logo: null,
    addresses: [],
    contract: { tname: "", emails: [""], phones: [""] },
    emails: [""],
    phones: [""],
    aboutUs: "",
    termsAndConditions: "",
    privacyPolicy: "",
    refundPolicy: "",
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Populate form when modal opens
  useEffect(() => {
    if (open && settings?.data) {
      setFormData({
        siteName: settings.data.siteName || "",
        logo: null,
        addresses: settings.data.addresses?.length
          ? settings.data.addresses
          : [{ label: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "" }],
        contract: settings.data.contract || { tname: "", emails: [""], phones: [""] },
        emails: settings.data.emails?.length ? settings.data.emails : [""],
        phones: settings.data.phones?.length ? settings.data.phones : [""],
        aboutUs: settings.data.aboutUs || "",
        termsAndConditions: settings.data.termsAndConditions || "",
        privacyPolicy: settings.data.privacyPolicy || "",
        refundPolicy: settings.data.refundPolicy || "",
      });
      setPreview(settings.data.logoUrl || null);
    }
  }, [open, settings]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateArrayField = (field, index, value, key) => {
    const updated = [...formData[field]];
    updated[index] = key ? { ...updated[index], [key]: value } : value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.siteName) {
      toast.warn("Site name is required");
      return;
    }

    try {
      setUploading(true);
      let logoUrl = preview;

      // Upload new logo if changed
      if (formData.logo) {
        const imgData = new FormData();
        imgData.append("image", formData.logo);
        const { data: uploadRes } = await axios.post(
          "http://localhost:3000/api/v1/all/upload-image",
          imgData
        );
        logoUrl = uploadRes.url;
      }

      await axios.put("http://localhost:3000/api/v1/settings", {
        siteName: formData.siteName,
        logoUrl,
        addresses: formData.addresses,
        contract: formData.contract,
        emails: formData.emails.filter(Boolean),
        phones: formData.phones.filter(Boolean),
        aboutUs: formData.aboutUs,
        termsAndConditions: formData.termsAndConditions,
        privacyPolicy: formData.privacyPolicy,
        refundPolicy: formData.refundPolicy,
      });

      toast.success("Settings saved successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Site Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Site Name</label>
                <input
                  className="border w-full rounded p-2"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                />
              </div>

              {/* Logo */}
              <div>
                <label className="block font-medium mb-2 text-text-title">Logo</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-neutral-line rounded-xl cursor-pointer hover:border-brand-primary transition">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-text-body/60">
                        <ImagePlus size={32} />
                        <span className="text-sm mt-2">Upload Logo</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <label className="block text-sm font-medium mb-2">Addresses</label>
                {formData.addresses.map((addr, i) => (
                  <div key={i} className="space-y-2 mb-4 border p-3 rounded relative">
                    {["label", "line1", "line2", "city", "state", "postalCode", "country"].map((key) => (
                      <input
                        key={key}
                        placeholder={key}
                        className="border w-full rounded p-1"
                        value={addr[key] || ""}
                        onChange={(e) => updateArrayField("addresses", i, e.target.value, key)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.addresses];
                        updated.splice(i, 1);
                        setFormData({ ...formData, addresses: updated });
                      }}
                      className="absolute top-1 right-1 text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      addresses: [...formData.addresses, { label: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "" }],
                    })
                  }
                  className="text-sm text-blue-600"
                >
                  + Add Address
                </button>
              </div>

              {/* Contract */}
              <div>
                <label className="block text-sm font-medium mb-2">Contract</label>
                <input
                  placeholder="Trade Name"
                  className="border w-full rounded p-2 mb-2"
                  value={formData.contract.tname || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, contract: { ...formData.contract, tname: e.target.value } })
                  }
                />
                {/* Contract Emails */}
                {formData.contract.emails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <input
                      placeholder="Email"
                      className="border w-full rounded p-1"
                      value={email || ""}
                      onChange={(e) => {
                        const updated = [...formData.contract.emails];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, contract: { ...formData.contract, emails: updated } });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.contract.emails];
                        updated.splice(i, 1);
                        setFormData({ ...formData, contract: { ...formData.contract, emails: updated } });
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, contract: { ...formData.contract, emails: [...formData.contract.emails, ""] } })
                  }
                  className="text-sm text-blue-600 mb-2"
                >
                  + Add Email
                </button>
                {/* Contract Phones */}
                {formData.contract.phones.map((ph, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <input
                      placeholder="Phone"
                      className="border w-full rounded p-1"
                      value={ph || ""}
                      onChange={(e) => {
                        const updated = [...formData.contract.phones];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, contract: { ...formData.contract, phones: updated } });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.contract.phones];
                        updated.splice(i, 1);
                        setFormData({ ...formData, contract: { ...formData.contract, phones: updated } });
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, contract: { ...formData.contract, phones: [...formData.contract.phones, ""] } })
                  }
                  className="text-sm text-blue-600"
                >
                  + Add Phone
                </button>
              </div>

              {/* Global Emails */}
              <div>
                <label className="block text-sm font-medium mb-1">Global Emails</label>
                {formData.emails.map((em, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <input
                      className="border w-full rounded p-1"
                      value={em || ""}
                      onChange={(e) => updateArrayField("emails", i, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.emails];
                        updated.splice(i, 1);
                        setFormData({ ...formData, emails: updated });
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-blue-600"
                  onClick={() => setFormData({ ...formData, emails: [...formData.emails, ""] })}
                >
                  + Add Email
                </button>
              </div>

              {/* Global Phones */}
              <div>
                <label className="block text-sm font-medium mb-1">Global Phones</label>
                {formData.phones.map((ph, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <input
                      className="border w-full rounded p-1"
                      value={ph || ""}
                      onChange={(e) => updateArrayField("phones", i, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.phones];
                        updated.splice(i, 1);
                        setFormData({ ...formData, phones: updated });
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-blue-600"
                  onClick={() => setFormData({ ...formData, phones: [...formData.phones, ""] })}
                >
                  + Add Phone
                </button>
              </div>

              {/* Rich Text Array Fields */}
              {[
                ["aboutUs", "About Us"],
                ["termsAndConditions", "Terms & Conditions"],
                ["privacyPolicy", "Privacy Policy"],
                ["refundPolicy", "Refund Policy"],
              ].map(([key, label]) => (
                <div key={key} className="border p-3 rounded mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{label}</h3>
                    <button
                      type="button"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          [key]: [...(formData[key] || []), { title: "", description: "" }],
                        })
                      }
                    >
                      <PlusCircle className="w-5 h-5 mr-1" />
                      Add
                    </button>
                  </div>

                  {(formData[key] || []).map((item, i) => (
                    <div key={i} className="mb-4 border p-2 rounded relative">
                      {/* Remove button (top right) */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData[key]];
                          updated.splice(i, 1);
                          setFormData({ ...formData, [key]: updated });
                        }}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {/* Title */}
                      <input
                        placeholder="Title"
                        className="border w-full rounded p-2 mb-2"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updated = [...formData[key]];
                          updated[i] = { ...updated[i], title: e.target.value };
                          setFormData({ ...formData, [key]: updated });
                        }}
                      />

                      {/* Description (Rich Text) */}
                      <RichTextEditor
                        value={item.description || ""}
                        content={item.description || ""}
                        onChange={(val) => {
                          const updated = [...formData[key]];
                          updated[i] = { ...updated[i], description: val };
                          setFormData({ ...formData, [key]: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}


              <button
                disabled={uploading}
                className="bg-blue-600 text-white rounded px-4 py-2 w-full"
              >
                {uploading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
