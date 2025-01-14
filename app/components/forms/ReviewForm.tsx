import { motion } from "framer-motion";

import { FormDataTypeProps } from "@/app/types/formDataType";

export const ReviewForm: React.FC<FormDataTypeProps> = ({ formData, isFirstLoad }) => {
    return (
        <div className="h-[480px] overflow-y-auto flex flex-col gap-3">
            <motion.ul
                initial={isFirstLoad ? { opacity: 0, y: 50 } : false}
                animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 2 }}
                className="mb-4">
                {Object.keys(formData).map((key) => {
                    if (key === "resumeUrl" && formData.resumeUrl instanceof File) {
                        return (
                            <li key={key} className="mb-2 flex">
                                <strong>Resume :</strong>
                                <div className="w-32 h-32 p-2">
                                    <img src={URL.createObjectURL(formData.resumeUrl)}
                                        className="w-full h-full object-contain" />
                                </div>
                            </li>
                        );
                    }
                    else {
                        return (
                            <li key={key} className="mb-2">
                                <strong>{key}:</strong> {formData[key]}
                            </li>
                        );
                    }

                })}
            </motion.ul>
        </div>
    );
};
