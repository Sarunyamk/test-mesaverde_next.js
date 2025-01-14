import { motion } from "framer-motion";

import { PageProps } from '@/app/types/formDataType'
import { InputField, TextAreaField } from '../InputField'

export const Page2: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage, isFirstLoad }) => {

    return (
        <div>
            <motion.div
                initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
                animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.5 }}
                className='mb-4'>
                <label className="block font-bold">Gender</label>
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
            </motion.div>
            <InputField
                label='Age'
                type="number"
                name="age"
                id="age"
                placeholder='Enter your age'
                value={formData.age}
                onChange={(value) => updateFormData({ age: value })}
                error={getErrorMessage("age")}
                isFirstLoad={isFirstLoad} />
            <TextAreaField
                label="Address"
                name="address"
                id='address'
                placeholder='Enter your address'
                value={formData.address}
                rows={4}
                onChange={(value) => updateFormData({ address: value })}
                isFirstLoad={isFirstLoad} />
            {getErrorMessage("address") && (
                <p className="text-red-500 text-xs">{getErrorMessage("address")}</p>
            )}
        </div>
    )
}