import { motion } from "framer-motion";

import { PageProps } from '@/app/types/formDataType'
import { InputField } from '../InputField'

export const Page1: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage, isFirstLoad }) => {


    return (
        <div>
            <motion.div
                initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
                animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.5 }}
                className='mb-4'>
                <label className="font-bold">Prefix</label>
                <select
                    className='w-full border p-2 border-gray-300 rounded mt-2'
                    value={formData.prefix}
                    onChange={(e) => updateFormData({ prefix: e.target.value })} >
                    <option value={""}>Select Prefix</option>
                    <option value="Mr">Mr.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Other">Other</option>
                </select>
                {getErrorMessage("prefix") && <p className='text-red-500 text-sm'>{getErrorMessage("prefix")}</p>}
            </motion.div>
            <InputField
                label='First Name'
                type="text"
                name="firstName"
                id="firstName"
                placeholder='Enter your first name'
                value={formData.firstName}
                onChange={(value) => updateFormData({ firstName: value })}
                error={getErrorMessage("firstName")}
                isFirstLoad={isFirstLoad} />
            <InputField
                label='Last Name'
                type="text"
                name="lastName"
                id="lastName"
                placeholder='Enter your last name'
                value={formData.lastName}
                onChange={(value) => updateFormData({ lastName: value })}
                error={getErrorMessage("lastName")}
                isFirstLoad={isFirstLoad} />
            <InputField
                label='Email'
                type="email"
                name="email"
                id="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={(value) => updateFormData({ email: value })}
                error={getErrorMessage("email")}
                isFirstLoad={isFirstLoad} />
            <InputField
                label='Phone Number'
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder='Enter your phone number'
                value={formData.phoneNumber}
                onChange={(value) => updateFormData({ phoneNumber: value })}
                error={getErrorMessage("phoneNumber")}
                isFirstLoad={isFirstLoad} />
        </div>
    )
}