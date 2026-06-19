interface FormInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
}

export default function FormInput({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
  textarea = false,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      {textarea ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {error && <p>{error}</p>}
    </div>
  );
}