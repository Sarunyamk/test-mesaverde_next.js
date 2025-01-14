
import { motion } from "framer-motion";

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
    isFirstLoad?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, name, placeholder, onChange, error, required, isFirstLoad }) => {


    return (
        <motion.div
            initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
            animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.5 }}
            className="flex flex-col mb-4 gap-1">
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
        </motion.div>
    )
}






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
    isFirstLoad?: boolean
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, id, name, placeholder, onChange, error, required, rows, isFirstLoad }) => {


    return (
        <motion.div
            initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
            animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.5 }}
            className="flex flex-col mb-1 gap-1">
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
        </motion.div>
    )
}

