export type FormDataType = {
    prefix: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    age: number;
    address: string;
    education: string;
    experience: string;
    position: string;
    resumeUrl: File | null;
}

export type FormDataTypeProps = {
    formData: FormDataType;
}

export type PageProps = {
    formData: FormDataType
    updateFormData: (newData: Partial<FormDataType>) => void
    getErrorMessage: (field: string) => string | undefined
}