type InputFieldProps = {
    label: string;
    type: string;
    value: string | number | null;
    name: string;
    placeholder: string;
    id: string;
    onChange: (value: any) => void;
    error?: string;
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, name, placeholder, onChange, error, required }) => (

    <div className="flex flex-col mb-4 gap-1">
        <label htmlFor={id} className="font-bold">{label}</label>
        <input
            type={type}
            name={name}
            id={id}
            value={value || ""}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            className={`border p-2 rounded ${error ? "border-red-500 " : "border-gray-300"}`} />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
)

type TextAreaFieldProps = {
    label: string;
    value: string;
    name: string;
    id: string;
    placeholder: string;
    onChange: (value: any) => void;
    error?: string;
    required?: boolean;
    rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, id, name, placeholder, onChange, error, required, rows }) => (
    <div className="flex flex-col mb-1 gap-1">
        <label className="font-bold">{label}</label>
        <textarea
            name={name}
            value={value || ""}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className={`border p-2 rounded ${error ? "border-red-500 " : "border-gray-300"}`} />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
)