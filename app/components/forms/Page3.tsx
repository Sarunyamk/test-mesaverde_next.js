import { PageProps } from '@/app/types/formDataType'
import { TextAreaField } from '../InputField'
import { validateFile } from '@/ีutils/validateFile';

export const Page3: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage }) => {

    const hdlShowSelectFile = (file: File | null) => {
        if (file) {
            const error = validateFile(file);
            if (error) {
                updateFormData({ resumeUrl: null });
            } else {
                updateFormData({ resumeUrl: file });
            }
        } else {
            updateFormData({ resumeUrl: null });
        }
    };

    return (
        <div>
            <div className='mb-4'>
                <label className="block font-bold">Education</label>
                <select
                    value={formData.education}
                    onChange={(e) => updateFormData({ education: e.target.value })}
                    className={`w-full border p-2 ${getErrorMessage("education") ? "border-red-500" : "border-gray-300"
                        } rounded mt-2`}
                >
                    <option value="">Select Education</option>
                    <option value="HighSchool">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                </select>
                {getErrorMessage("education") && (
                    <p className="text-red-500 text-xs">{getErrorMessage("education")}</p>
                )}
            </div>
            <TextAreaField
                label="Work Experience"
                name="experience"
                id='experience'
                placeholder='Enter your work experience'
                value={formData.experience}
                rows={4}
                onChange={(value) => updateFormData({ experience: value })} />
            {getErrorMessage("experience") && (
                <p className="text-red-500 text-xs mb-4">{getErrorMessage("experience")}</p>
            )}

            <div className="flex flex-col gap-2">
                <label className="font-bold">Upload Resume:</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => hdlShowSelectFile(e.target.files?.[0] || null)}
                />
                {formData.resumeUrl && (
                    <p className="mt-2 text-sm text-gray-500">Selected File: {formData.resumeUrl.name}</p>
                )}
                {getErrorMessage("resumeUrl") && (
                    <p className="text-red-500 text-xs">{getErrorMessage("resumeUrl")}</p>
                )}
            </div>

        </div>
    )
}