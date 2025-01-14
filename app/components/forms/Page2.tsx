import { PageProps } from '@/app/types/formDataType'
import { InputField, TextAreaField } from '../InputField'

export const Page2: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage }) => {

    return (
        <div>
            <div className='mb-4'>
                <label className="block text-gray-700">Gender</label>
                <div className="flex gap-4 mt-2">
                    {["Male", "Female", "Other"].map((gender) => (
                        <label key={gender} className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={formData.gender === gender}
                                onChange={(e) => updateFormData({ gender: e.target.value })}
                                className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">{gender}</span>
                        </label>
                    ))}
                </div>
                {getErrorMessage("gender") && (
                    <p className="text-red-500 text-xs">{getErrorMessage("gender")}</p>
                )}
            </div>
            <InputField
                label='Age'
                type="number"
                name="age"
                id="age"
                placeholder='Enter your age'
                value={formData.age}
                onChange={(value) => updateFormData({ age: value })}
                error={getErrorMessage("age")} />
            <TextAreaField
                label="Address"
                name="address"
                id='address'
                placeholder='Enter your address'
                value={formData.address}
                rows={4}
                onChange={(value) => updateFormData({ address: value })} />
            {getErrorMessage("address") && (
                <p className="text-red-500 text-xs">{getErrorMessage("address")}</p>
            )}
        </div>
    )
}