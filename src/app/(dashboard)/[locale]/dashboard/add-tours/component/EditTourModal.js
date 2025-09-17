"use client";

import { useCategoryContext } from "@/context/categoryContext";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import { useSubCategoryContext } from "@/context/subCategoryContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImagePlus, Loader2, ChevronDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import TagInput from "./TagInput";
import RichTextEditor from "@/app/(dashboard)/component/RichTextEditor";
import useAxiosPost from "@/utils/useAxiosPost";
import axios from "axios";
import { useCountryContext } from "@/context/countryContext";
import { toast } from "react-toastify";

export default function EditTourModal({ open, onClose, onSuccess, tour }) {
    // const [title, setTitle] = useState(tour?.title || "");
    const [titles, setTitles] = useState(tour?.title);
    const [tourType, setTourType] = useState(tour?.tourType);
    const [facalites, setFacalites] = useState(tour?.facalites);
    console.log('tour', tour)
    const [details, setDetails] = useState({
        info: tour?.details?.info || "",
        duration: tour?.details?.duration || "",
        schedule: tour?.details?.schedule || "",
        meetingPoint: tour?.details?.meetingPoint || "",
        guide: tour?.details?.guide || "",
        fitnessLevel: tour?.details?.fitnessLevel || "",
    });
    const [basePrice, setBasePrice] = useState(tour?.pricing?.basePrice)
    // ✅ State
    const [extraPrices, setExtraPrices] = useState(tour?.pricing?.extraPrices);
    // ✅ Handlers
    const handleExtraPriceChange = (index, field, value) => {
        const updated = [...extraPrices];
        updated[index][field] = value;
        setExtraPrices(updated);
    };

    const addExtraPriceRow = () => {
        setExtraPrices([...extraPrices, { name: "", price: "" }]);
    };

    const removeExtraPriceRow = (index) => {
        const updated = [...extraPrices];
        updated.splice(index, 1);
        setExtraPrices(updated);
    };

    const [description, setDescription] = useState(tour?.description || "");
    const [included, setIncluded] = useState(tour?.included || []);
    const [excluded, setExcluded] = useState(tour?.excluded || []);
    const [whatToBring, setWhatToBring] = useState(tour?.whatToBring || []);
    const [images, setImages] = useState(tour?.images || []);
    const [imagePreviews, setImagePreviews] = useState(tour?.images || []);
    const [pricingType, setPricingType] = useState(tour?.pricing?.type || "perPerson");
    const [perPersonPrices, setPerPersonPrices] = useState(tour?.pricing?.perPersonPrices);
    const [perPersonPrice, setPerPersonPrice] = useState(tour?.pricing?.perPersonPrice || "");
    const [groupPrices, setGroupPrices] = useState(tour?.pricing?.groupPrices || [{ persons: "", price: "" }]);
    const { newPlace, newPlaceLoading } = useNewPlaceContext();
    const { country, setReload, countryLoading } = useCountryContext();
    const [advanceType, setAdvanceType] = useState("days");
    const [advanceValue, setAdvanceValue] = useState(10);
    const [timeSlots, setTimeSlots] = useState(tour?.timeSlots);
    const [, updateTour, createTourLoading] = useAxiosPost({}, "patch");
    const [selectedCountry, setselectedCountry] = useState(tour?.country || null);
    const [descriptions, setDescriptions] = useState(tour?.description);
    const [selectedPlace, setSelectedPlace] = useState(tour?.place || null);
    const [cancelation, setCancelation] = useState(tour?.cancelation);


    useEffect(() => {
        if (!tour) return;

        // setTitle(tour.title || "");
        setTitles(tour?.title)
        setTourType(tour?.tourType || "")
        setFacalites(tour?.facalites || "")
        setDetails({
            info: tour.details?.info || "",
            duration: tour.details?.duration || "",
            schedule: tour.details?.schedule || "",
            meetingPoint: tour.details?.meetingPoint || "",
            guide: tour.details?.guide || "",
            fitnessLevel: tour.details?.fitnessLevel || "",
        });
        setDescriptions(tour?.description)
        setBasePrice(tour?.pricing?.basePrice || "")
        setExtraPrices(tour?.pricing?.extraPrices || "")
        setDescription(tour.description || "");
        setIncluded(tour.included || []);
        setTimeSlots(tour?.timeSlots)
        setExcluded(tour.excluded || []);
        setWhatToBring(tour.whatToBring || []);
        setImages(tour.images || []);
        setImagePreviews(tour.images || []);
        setPricingType(tour.pricing?.type || "perPerson");
        setPerPersonPrice(tour.pricing?.perPersonPrice || "");
        setPerPersonPrices(tour?.pricing?.perPersonPrices)
        setGroupPrices(tour.pricing?.groupPrices || [{ persons: "", price: "" }]);
        setCancelation(tour?.cancelation)
        setselectedCountry(tour.country || null);
        setSelectedPlace(tour.place || null);
    }, [tour]);


    const [dropdownOpen, setDropdownOpen] = useState({
        category: false,
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

    const handleDescriptionChange = (index, val) => {
        const updated = [...descriptions];
        updated[index] = val;
        setDescriptions(updated);
    };

    const addNewDescription = () => {
        setDescriptions([...descriptions, ""]);
    };

    const removeDescription = (index) => {
        const updated = descriptions.filter((_, i) => i !== index);
        setDescriptions(updated);
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


        setUploading(true);
        try {
            let uploadedImages = [];

            // Only run upload if there are new File objects
            if (images.some((file) => file instanceof File)) {
                const formData = new FormData();

                images.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("images", file);
                    }
                });

                const uploadRes = await axios.post(
                    "http://localhost:3000/api/v1/all/upload-images",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                uploadedImages = uploadRes.data.urls;
            }

            // Merge already uploaded URLs with newly uploaded ones
            const finalImages = [
                ...images.filter((img) => typeof img === "string"),
                ...uploadedImages,
            ];
            const tourData = {
                title: titles,
                details,
                facalites,
                description: descriptions,
                tourType,
                included,
                excluded,
                whatToBring,
                images: finalImages,
                pricing: {
                    type: pricingType,
                    basePrice: basePrice,
                    perPersonPrices:
                        pricingType === "perPerson" ? perPersonPrices : null,
                    groupPrices: pricingType === "groupTier" ? groupPrices : [],
                    extraPrices: extraPrices.filter((ep) => ep.name && ep.price),
                },
                country: selectedCountry?._id,
                place: selectedPlace?._id,
                advanceTime: {
                    [advanceType]: Number(advanceValue),
                }, // date object
                cancelation: cancelation,
                timeSlots: timeSlots.map((slot) => ({
                    startHour: slot.startHour,
                    startMinute: slot.startMinute,

                })),
            };

            updateTour(`http://localhost:3000/api/v1/tours/${tour?._id}`, tourData, (data) => {
                if (data?.status === "success") {
                    if (onSuccess) onSuccess();
                    onClose();
                }
            }, true);
            // toast.success("Tour added successfully!");

        } catch (err) {
            console.log(err);
            toast.warn("Error adding tour");
        } finally {
            setUploading(false);
        }
    };

    console.log("perPersonPrice", perPersonPrices)
    // Dropdown component
    const Dropdown = ({ label, items, selected, setSelected, open, setOpen }) => (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full text-black flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            {item?.name}
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
                        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 text-gray-800 overflow-auto max-h-[90vh]"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Tour</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-text-title mb-2">
                                    Tour Titles
                                </label>

                                {titles?.map((title, index) => (
                                    <div key={index} className="mb-3 flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => {
                                                const newTitles = [...titles];
                                                newTitles[index] = e.target.value;
                                                setTitles(newTitles);
                                            }}
                                            placeholder="Enter tour title"
                                            className="w-full px-4 py-2.5 rounded-lg shadow-sm 
          border border-neutral-line 
          text-text-body bg-white
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
          transition duration-200"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTitles(titles.filter((_, i) => i !== index));
                                                }}
                                                className="text-red-600 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setTitles([...titles, ""])}
                                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                >
                                    + Add New Title
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-title mb-2">
                                        Tour Type
                                    </label>
                                    <input
                                        type="text"
                                        value={tourType}
                                        onChange={(e) => setTourType(e.target.value)}
                                        placeholder="Enter tour Type"
                                        className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                                                                border border-neutral-line 
                                                                text-text-body bg-white
                                                                placeholder:text-gray-400
                                                                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                                                transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-title mb-2">
                                        Facalites
                                    </label>
                                    <input
                                        type="text"
                                        value={facalites}
                                        onChange={(e) => setFacalites(e.target.value)}
                                        placeholder="Facalites"
                                        className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                                                                border border-neutral-line 
                                                                text-text-body bg-white
                                                                placeholder:text-gray-400
                                                                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                                                transition duration-200"
                                    />
                                </div>

                                <div className="col-span-2 flex items-end space-x-4">
                                    {/* Type Dropdown */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-text-title mb-2">
                                            Advance Time Type
                                        </label>
                                        <select
                                            value={advanceType}
                                            onChange={(e) => setAdvanceType(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                            border border-neutral-line 
                            text-text-body bg-white
                            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                            transition duration-200"
                                        >
                                            <option value="">Select type</option>
                                            <option value="days">Days</option>
                                            <option value="hours">Hours</option>
                                            <option value="months">Months</option>
                                        </select>
                                    </div>

                                    {/* Number Input */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-text-title mb-2">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={advanceValue}
                                            onChange={(e) => setAdvanceValue(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg shadow-sm 
                            border border-neutral-line 
                            text-text-body bg-white
                            placeholder:text-gray-400
                            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                            transition duration-200"
                                            placeholder="Enter value"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-4">
                                    <label className="block text-sm font-medium text-text-title">
                                        Time Slots
                                    </label>

                                    {timeSlots?.map((slot, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            {/* Start Time */}
                                            <input
                                                type="time"
                                                value={`${String(slot.startHour).padStart(
                                                    2,
                                                    "0"
                                                )}:${String(slot.startMinute).padStart(2, "0")}`}
                                                onChange={(e) => {
                                                    const [h, m] = e.target.value.split(":").map(Number);
                                                    const updatedSlots = [...timeSlots];
                                                    updatedSlots[index].startHour = h;
                                                    updatedSlots[index].startMinute = m;
                                                    setTimeSlots(updatedSlots);
                                                }}
                                                className="w-40 px-4 py-2.5 rounded-lg shadow-sm 
                              border border-neutral-line 
                              text-text-body bg-white
                              placeholder:text-gray-400
                              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                              transition duration-200"
                                            />



                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedSlots = timeSlots.filter(
                                                        (_, i) => i !== index
                                                    );
                                                    setTimeSlots(updatedSlots);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add New Slot */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setTimeSlots([
                                                ...timeSlots,
                                                {
                                                    startHour: 9,
                                                    startMinute: 0,
                                                    endHour: 10,
                                                    endMinute: 0,
                                                },
                                            ])
                                        }
                                        className="mt-2 px-4 py-2 rounded-lg bg-brand-primary text-white shadow 
                          hover:bg-brand-primary/90 transition duration-200"
                                    >
                                        + Add Time Slot
                                    </button>
                                </div>
                            </div>
                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(details).map((key) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-text-title mb-2 capitalize">
                                            {key}
                                        </label>
                                        <input
                                            type="text"
                                            value={details[key]}
                                            onChange={(e) =>
                                                setDetails({ ...details, [key]: e.target.value })
                                            }
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
                                    label="Country"
                                    items={country?.data}
                                    selected={selectedCountry}
                                    setSelected={setselectedCountry}
                                    open={dropdownOpen.country}
                                    setOpen={(open) =>
                                        setDropdownOpen({ ...dropdownOpen, country: open })
                                    }
                                />
                                <Dropdown
                                    label="Destination"
                                    items={newPlace?.data}
                                    selected={selectedPlace}
                                    setSelected={setSelectedPlace}
                                    open={dropdownOpen.place}
                                    setOpen={(open) =>
                                        setDropdownOpen({ ...dropdownOpen, place: open })
                                    }
                                />
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-text-title mb-2 capitalize">
                                    Description
                                </label>

                                {descriptions?.map((desc, index) => (
                                    <div key={index} className="mb-4">
                                        <RichTextEditor
                                            content={desc}
                                            className="w-full px-4 rounded-lg shadow-sm 
                              border border-neutral-line 
                              !text-text-body bg-white
                              placeholder:text-text-body
                              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                              transition duration-200"
                                            onChange={(val) => handleDescriptionChange(index, val)}
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDescription(index)}
                                                className="mt-2 text-red-600 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addNewDescription}
                                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                >
                                    + Add New Description
                                </button>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Included
                                </label>
                                <TagInput items={included} setter={setIncluded} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Excluded
                                </label>
                                <TagInput items={excluded} setter={setExcluded} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    What to Bring
                                </label>
                                <TagInput items={whatToBring} setter={setWhatToBring} />
                            </div>

                            {/* Images */}
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


                            {pricingType === "perPerson" && perPersonPrices && (
                                <div className="mt-3 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Per Person Prices
                                    </label>

                                    {Object.entries(perPersonPrices)
                                        .filter(([key, value]) => value !== undefined && value !== null && value !== "")
                                        .map(([key, value]) => (
                                            <div key={key} className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) =>
                                                        setPerPersonPrices((prev) => ({
                                                            ...prev,
                                                            [key]: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="Enter price"
                                                    className="flex-1 px-3 py-2 w-full rounded-lg shadow-sm 
              border border-neutral-line 
              text-text-body bg-white
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
              transition duration-200"
                                                />
                                                <span className="text-gray-700 capitalize">{key}</span>
                                            </div>
                                        ))}
                                </div>
                            )}


                            <div className="mt-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Extra Pricing Options
                                </label>

                                <div className="space-y-2">
                                    {extraPrices?.map((ep, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            {/* Free-text name */}
                                            <input
                                                type="text"
                                                value={ep.name}
                                                onChange={(e) =>
                                                    handleExtraPriceChange(idx, "name", e.target.value)
                                                }
                                                placeholder="Option Name (e.g. Breakfast)"
                                                className="flex-1 px-3 py-2 rounded-lg shadow-sm 
                                border border-neutral-line 
                                text-text-body bg-white
                                placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                transition duration-200"
                                            />

                                            {/* Price */}
                                            <input
                                                type="number"
                                                value={ep.price}
                                                onChange={(e) =>
                                                    handleExtraPriceChange(idx, "price", e.target.value)
                                                }
                                                placeholder="Price"
                                                className="w-32 px-3 py-2 rounded-lg shadow-sm 
                                border border-neutral-line 
                                text-text-body bg-white
                                placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                transition duration-200"
                                            />

                                            {/* Remove row */}
                                            <button
                                                type="button"
                                                onClick={() => removeExtraPriceRow(idx)}
                                                className="bg-brand-secondary text-white px-2 rounded-lg hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add new row */}
                                    <button
                                        type="button"
                                        onClick={addExtraPriceRow}
                                        className="bg-brand-secondary text-white px-3 py-1 rounded-lg hover:bg-brand-secondary mt-2"
                                    >
                                        + Add Extra Option
                                    </button>
                                </div>
                            </div>
                            <RichTextEditor
                                content={cancelation}
                                className="w-full px-4 rounded-lg shadow-sm 
          border border-neutral-line 
          !text-text-body bg-white
          placeholder:text-text-body
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
          transition duration-200"
                                onChange={(val) => setCancelation(val)}
                            />
                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition disabled:opacity-50"
                            >
                                {uploading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <Upload size={18} />
                                )}
                                {uploading ? "Uploading..." : "Add Tour"}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
