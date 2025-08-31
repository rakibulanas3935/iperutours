import React, { useState } from 'react'

const TagInput = ({ items, setter }) => {
    const [input, setInput] = useState("");
    // Add/remove tags
    const handleAddTag = (setter, value, setterInput) => {
        if (!value.trim()) return;
        setter((prev) => [...prev, value]);
        setterInput("");
    };
    const handleRemoveTag = (setter, index) => {
        setter((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex gap-2 flex-wrap mb-2">
                {items.map((item, idx) => (
                    <div
                        key={idx + 1}
                        className="flex items-center gap-1 bg-brand-primary px-2 py-1 rounded-full text-sm"
                    >
                        {item}
                        <button type="button" onClick={() => handleRemoveTag(setter, idx)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add item"
                    className="flex-1 px-3 py-2 w-full rounded-lg shadow-sm 
                                        border border-neutral-line 
                                        text-text-body bg-white
                                        placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                                        transition duration-200 "
                />
                <button
                    type="button"
                    onClick={() => handleAddTag(setter, input, setInput)}
                    className="bg-accent-pink text-white px-3 py-2 rounded-lg hover:bg-secondary"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TagInput