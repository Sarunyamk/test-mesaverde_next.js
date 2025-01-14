export const validateFile = (file: File): string | null => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        return "Invalid file type. Only PNG and JPEG are allowed.";
    }

    if (file.size > maxSize) {
        return "File is too large. Maximum size is 5MB.";
    }

    return null;
};
