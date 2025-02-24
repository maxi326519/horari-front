interface TextAreaInputData {
  name: string;
  value: string;
  label: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextAreaInput({
  name,
  value,
  label,
  error,
  onChange,
}: TextAreaInputData) {
  return (
    <div className={`form-floating ${name}`}>
      <textarea
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        style={{ height: "200px" }}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {error && <small>{error}</small>}
    </div>
  );
}
