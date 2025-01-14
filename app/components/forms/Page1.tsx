import { PageProps } from '@/app/types/formDataType'
import { InputField, TextAreaField } from '../InputField'

export const Page1: React.FC<PageProps> = ({ formData, updateFormData, getErrorMessage }) => {

    return (
        <div>
            <div className='mb-4'>
                <label>Prefix</label>
                <select>
                    <option value={""}>Select Prefix</option>
                    <option value="Mr">Mr.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Other">Other</option>
                </select>
                {getErrorMessage("prefix") && <p className='text-red-500'>{getErrorMessage("prefix")}</p>}
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