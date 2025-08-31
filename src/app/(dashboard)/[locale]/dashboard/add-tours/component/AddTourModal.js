"use client";

import { useCategoryContext } from "@/context/categoryContext";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import { useSubCategoryContext } from "@/context/subCategoryContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImagePlus, Loader2, ChevronDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import TagInput from "./TagInput";
import RichTextEditor from "@/app/(dashboard)/component/RichTextEditor";
import useAxiosPost from "@/utils/useAxiosPost";
import axios from "axios";

export default function AddTourModal({ open, onClose, onSuccess }) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState({
        duration: "",
        schedule: "",
        meetingPoint: "",
        guide: "",
        fitnessLevel: "",
    });
    const [description, setDescription] = useState("");
    const [included, setIncluded] = useState([]);
    const [excluded, setExcluded] = useState([]);
    const [whatToBring, setWhatToBring] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pricingType, setPricingType] = useState("perPerson");
    const [perPersonPrice, setPerPersonPrice] = useState("");
    const [groupPrices, setGroupPrices] = useState([{ persons: "", price: "" }]);
    const { newPlace, newPlaceLoading } = useNewPlaceContext();
    const { subCategorys, subCategorysLoading } = useSubCategoryContext();

    const { categorys, categorysLoading, setReload } = useCategoryContext();
    const [, createTour, createTourLoading] = useAxiosPost({}, "post");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState({
        category: false,
        subcategory: false,
        place: false,
    });

    const [uploading, setUploading] = useState(false);

    // Handle multiple image selection (append new files)
    const handleImagesChange = (e) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    };

    // Remove single image
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // Drag & drop reorder
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedPreviews = Array.from(imagePreviews);
        const [removedPreview] = reorderedPreviews.splice(result.source.index, 1);
        reorderedPreviews.splice(result.destination.index, 0, removedPreview);

        const reorderedImages = Array.from(images);
        const [removedFile] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, removedFile);

        setImagePreviews(reorderedPreviews);
        setImages(reorderedImages);
    };


    // Group price handlers
    const handleGroupPriceChange = (index, field, value) => {
        const updated = [...groupPrices];
        updated[index][field] = value;
        setGroupPrices(updated);
    };
    const addGroupPriceRow = () => setGroupPrices([...groupPrices, { persons: "", price: "" }]);
    const removeGroupPriceRow = (index) =>
        setGroupPrices(groupPrices.filter((_, i) => i !== index));

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !title ||
            !description ||
            !selectedCategory ||
            !selectedSubCategory ||
            !selectedPlace ||
            images.length === 0
        ) {
            toast.warn("Please fill all required fields and select images");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            images.forEach((file) => formData.append("images", file));

            const uploadRes = await axios.post(
                "http://localhost:3000/api/v1/all/upload-images",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const uploadedImages = uploadRes.data.urls;
            console.log('uploadedImages', uploadedImages)
            const tourData = {
                title,
                details,
                description,
                included,
                excluded,
                whatToBring,
                images: uploadedImages,
                pricing: {
                    type: pricingType,
                    perPersonPrice: pricingType === "perPerson" ? perPersonPrice : undefined,
                    groupPrices: pricingType === "groupTier" ? groupPrices : [],
                },
                category: selectedCategory?._id,
                subcategory: selectedSubCategory?._id,
                place: selectedPlace?._id,
            };

            createTour("http://localhost:3000/api/v1/tours", tourData, (data) => {
                if (data?.status === "success") {
                    if (onSuccess) onSuccess();
                    onClose();
                }
            },true);
            // toast.success("Tour added successfully!");

            // Reset form
            setTitle("");
            setDetails({ duration: "", schedule: "", meetingPoint: "", guide: "", fitnessLevel: "" });
            setDescription("");
            setIncluded([]);
            setExcluded([]);
            setWhatToBring([]);
            setImages([]);
            setImagePreviews([]);
            setPerPersonPrice("");
            setGroupPrices([{ persons: "", price: "" }]);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setSelectedPlace(null);
        } catch (err) {
            console.log(err);
            alert("Error adding tour");
        } finally {
            setUploading(false);
        }
    };


    // Dropdown component
    const Dropdown = ({ label, items, selected, setSelected, open, setOpen }) => (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full text-black flex justify-between items-center px-4 py-2 border-0 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
            >
                {selected ? selected?.placeName || selected?.name : `-- Select ${label} --`}
                <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {open && (
                <ul className="absolute z-10 w-full mt-1 max-h-60 text-black overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                    {items?.map((item) => (
                        <li
                            key={item?._id}
                            onClick={() => {
                                setSelected(item);
                                setOpen(false);
                            }}
                            className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer"
                        >
                            {item?.name || item?.placeName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-full max-w-4xl bg-neutral-background rounded-2xl shadow-xl p-6 md:p-8 text-gray-800 overflow-auto max-h-[90vh]"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 cursor-pointer right-4 text-gray-600 hover:text-brand-secondary transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Tour</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-text-title mb-2">
                            Title
                            </label>
                            <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter tour title"
                            className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                            />
                        </div>
                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(details).map((key) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-text-title mb-2 capitalize">{key}</label>
                                        <input
                                            type="text"
                                            value={details[key]}
                                            onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                                            placeholder={`Enter ${key}`}
                                            className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                                        />
                                    </div>
                                ))}
                            </div>
                                   {/* Category / Subcategory / Place */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Dropdown
                                    label="Category"
                                    items={categorys?.data}
                                    selected={selectedCategory}
                                    setSelected={setSelectedCategory}
                                    open={dropdownOpen.category}
                                    setOpen={(open) => setDropdownOpen({ ...dropdownOpen, category: open })}
                                />
                                <Dropdown
                                    label="Sub Category"
                                    items={subCategorys?.data}
                                    selected={selectedSubCategory}
                                    setSelected={setSelectedSubCategory}
                                    open={dropdownOpen.subcategory}
                                    setOpen={(open) => setDropdownOpen({ ...dropdownOpen, subcategory: open })}
                                />
                                <Dropdown
                                    label="Place"
                                    items={newPlace?.data}
                                    selected={selectedPlace}
                                    setSelected={setSelectedPlace}
                                    open={dropdownOpen.place}
                                    setOpen={(open) => setDropdownOpen({ ...dropdownOpen, place: open })}
                                />
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-text-title mb-2 capitalize">Description</label>
                                <RichTextEditor
                                    value={description}
                                    className="w-full px-4 rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        !text-text-body bg-white
                                        placeholder:text-text-body
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                                    onChange={(val) => setDescription(val)}
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Included</label>
                                <TagInput items={included} setter={setIncluded} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excluded</label>
                                <TagInput items={excluded} setter={setExcluded} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">What to Bring</label>
                                <TagInput items={whatToBring} setter={setWhatToBring} />
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                                <div className="flex flex-wrap gap-4">
                                    <DragDropContext onDragEnd={handleDragEnd}>
                                        <Droppable droppableId="images" direction="horizontal">
                                            {(provided) => (
                                                <div
                                                    className="flex gap-4"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {imagePreviews.map((src, idx) => (
                                                        <Draggable key={`${src}-${idx}`} draggableId={`${src}-${idx}`} index={idx}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="w-24 h-24 relative rounded-lg overflow-hidden border"
                                                                >
                                                                    <img
                                                                        src={src}
                                                                        alt={`preview ${idx}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeImage(idx)}
                                                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                    <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 text-gray-400">
                                                        <ImagePlus size={24} />
                                                        <span className="text-xs mt-1">Add</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={handleImagesChange}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>


                            {/* Pricing */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Type</label>
                                <div className="flex gap-4">
                                    <label className="flex text-black items-center gap-2">
                                        <input
                                            type="radio"
                                            name="pricingType"
                                            value="perPerson"
                                            checked={pricingType === "perPerson"}
                                            onChange={() => setPricingType("perPerson")}
                                        />
                                        Per Person
                                    </label>
                                    <label className="flex text-black items-center gap-2">
                                        <input
                                            type="radio"
                                            name="pricingType"
                                            value="groupTier"
                                            checked={pricingType === "groupTier"}
                                            onChange={() => setPricingType("groupTier")}
                                        />
                                        Group Tier
                                    </label>
                                </div>

                                {pricingType === "perPerson" && (
                                    <input
                                        type="number"
                                        value={perPersonPrice}
                                        onChange={(e) => setPerPersonPrice(e.target.value)}
                                        placeholder="Enter price per person"
                                        className="flex-1 px-3 py-2 w-full rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                                    />
                                )}

                                {pricingType === "groupTier" && (
                                    <div className="mt-2 space-y-2">
                                        {groupPrices.map((gp, idx) => (
                                            <div key={idx+1} className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={gp.persons}
                                                    onChange={(e) => handleGroupPriceChange(idx, "persons", e.target.value)}
                                                    placeholder="Persons"
                                                    className="flex-1 px-3 py-2 w-full rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                                                />
                                                <input
                                                    type="number"
                                                    value={gp.price}
                                                    onChange={(e) => handleGroupPriceChange(idx, "price", e.target.value)}
                                                    placeholder="Price"
                                                    className="flex-1 px-3 py-2 w-full rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGroupPriceRow(idx)}
                                                    className="bg-brand-secondary text-white px-2 rounded-lg hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addGroupPriceRow}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 mt-1"
                                        >
                                            Add Row
                                        </button>
                                    </div>
                                )}
                            </div>

                         

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition disabled:opacity-50"
                            >
                                {uploading ? <Loader2 className="animate-spin h-5 w-5" /> : <Upload size={18} />}
                                {uploading ? "Uploading..." : "Add Tour"}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
