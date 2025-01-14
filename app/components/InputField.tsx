type InputFieldProps = {
    label: string;
    type: string;
    value: string | number | null;
    name: string;
    placeholder: string;
    onChange: (value: any) => void;
    error?: string;
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, value, name, placeholder, onChange, error, required }) => (

    <div>
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value || ""}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            className={`border p-2 rounded mt-2 ${error ? "border-red-500 " : "border-gray-300"}`} />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
)

type TextAreaFieldProps = {
    label: string;
    value: string;
    name: string;
    placeholder: string;
    onChange: (value: any) => void;
    error?: string;
    required?: boolean;
    rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, name, placeholder, onChange, error, required, rows }) => (
    <div>
        <label>{label}</label>
        <textarea
            name={name}
            value={value || ""}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className={`border p-2 rounded mt-2 ${error ? "border-red-500 " : "border-gray-300"}`} />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
)