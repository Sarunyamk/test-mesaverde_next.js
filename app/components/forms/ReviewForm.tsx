import { FormDataTypeProps } from "@/app/types/formDataType";

export const ReviewForm: React.FC<FormDataTypeProps> = ({ formData }) => {
    return (
        <div className="h-[500px] overflow-y-auto">
            <ul className="mb-4">
                {Object.keys(formData).map((key) => {
                    if (key === "resumeUrl" && formData.resumeUrl instanceof File) {
                        return (
                            <li key={key} className="mb-2 flex">
                                <strong>Resume :</strong>
                                <div className="w-32 h-32">
                                    <img src={URL.createObjectURL(formData.resumeUrl)}
                                        className="max-w-full h-auto" />
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
            </ul>
        </div>
    );
};
