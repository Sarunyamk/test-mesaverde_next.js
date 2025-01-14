import { PageProps } from '@/app/types/formDataType'
import { InputField, TextAreaField } from '../InputField'

export const Page3: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage }) => {

    return (
        <div>
            <div className='mb-4'>
                <label className="block text-gray-700">Education</label>
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
                <p className="text-red-500 text-xs">{getErrorMessage("experience")}</p>
            )}
            <InputField
                label='Position'
                type="text"
                name="position"
                id="position"
                placeholder='Enter your position'
                value={formData.position}
                onChange={(value) => updateFormData({ position: value })}
                error={getErrorMessage("position")} />
        </div>
    )
}