import { motion } from "framer-motion";

import { FormDataTypeProps } from "@/app/types/formDataType";

export const ReviewForm: React.FC<FormDataTypeProps> = ({ formData, isFirstLoad }) => {
    return (
        <div className="h-[480px] overflow-y-auto flex flex-col ">
            <motion.ul
                initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
                animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.5 }}
                className="mb-4">
                {Object.keys(formData).map((key) => {
                    if (key === "resumeUrl" && formData.resumeUrl instanceof File) {
                        return (
                            <li key={key} className="flex items-start gap-4">
                                <div className="font-bold w-[30%] text-left">{key}:</div>
                                <div className="w-[70%] text-left p-4">
                                    <img
                                        src={URL.createObjectURL(formData.resumeUrl)}
                                        alt="Resume Preview"
                                        className="w-40 h-40 object-contain "
                                    />
                                </div>
                            </li>
                        );
                    }
                    else {
                        return (
                            <li key={key} className="flex gap-4">
                                <div className="font-bold w-[30%] text-left">{key} :</div>
                                <div className="w-[70%] text-left">{formData[key]}</div>
                            </li>

                        );
                    }

                })}
            </motion.ul>
        </div>
    );
};