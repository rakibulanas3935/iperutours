  export const handleDragEnd = (result) => {
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

  export const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };