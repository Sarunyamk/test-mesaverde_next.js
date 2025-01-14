import { FormDataTypeProps } from "@/app/types/formDataType";

export const ReviewForm: React.FC<FormDataTypeProps> = ({ formData }) => (

    <div className="h-[500px] overflow-y-auto">
        <ul className="mb-4">
            {Object.keys(formData).map((key) => {
                if (key === "resume" && formData.resumeUrl) {
                    // แสดงเฉพาะชื่อไฟล์ของ resume
                    return (
                        <li key={key} className="mb-2">
                            <strong>Resume:</strong> {formData.resumeUrl.name}
                        </li>
                    );
                } else if (key === "resumeUrl" && formData.resumeUrl) {
                    // แสดงเฉพาะ URL ของ resumeUrl
                    return (
                        <li key={key} className="mb-2">
                            <strong>Resume URL:</strong>{" "}
                            <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer">
                                {formData.resumeUrl}
                            </a>
                        </li>
                    );
                } else if (key !== "resume" && key !== "resumeUrl") {
                    // แสดงฟิลด์อื่นๆ
                    return (
                        <li key={key} className="mb-2">
                            <strong>{key}:</strong> {formData[key]}
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    </div>
)