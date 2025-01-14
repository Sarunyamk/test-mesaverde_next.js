import { PageProps } from '@/app/types/formDataType'
import { InputField } from '../InputField'

export const Page1: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage }) => {

    return (
        <div>
            <div className='mb-4'>
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
            </div>
            <InputField
                label='First Name'
                type="text"
                name="firstName"
                id="firstName"
                placeholder='Enter your first name'
                value={formData.firstName}
                onChange={(value) => updateFormData({ firstName: value })}
                error={getErrorMessage("firstName")} />
            <InputField
                label='Last Name'
                type="text"
                name="lastName"
                id="lastName"
                placeholder='Enter your last name'
                value={formData.lastName}
                onChange={(value) => updateFormData({ lastName: value })}
                error={getErrorMessage("lastName")} />
            <InputField
                label='Email'
                type="email"
                name="email"
                id="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={(value) => updateFormData({ email: value })}
                error={getErrorMessage("email")} />
            <InputField
                label='Phone Number'
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder='Enter your phone number'
                value={formData.phoneNumber}
                onChange={(value) => updateFormData({ phoneNumber: value })}
                error={getErrorMessage("phoneNumber")} />
        </div>
    )
}