import { useState, useEffect } from 'react';

function useImagePreview(onChange = () => { }) {
    const [preview, setPreview] = useState(null);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setPreview(null)
            onChange(null)
            return;
        }

        const file = files[0];
        const fileType = file["type"];

        if (!validImageTypes.includes(fileType)) {
            console.log("🚀 ~ file: useImagePreview.jsx:17 ~ handleFileChange ~ :", "Vui lòng chọn ảnh!");
            setPreview(null);
            onChange(null)
            return;
        }

        setPreview(URL.createObjectURL(file));
    };


    const clearPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        onChange(null)

    };

    useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

    return { preview, handleFileChange, clearPreview };
}

export default useImagePreview;
