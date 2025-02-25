interface InputProps {
  name: string;
  value: string | number | undefined;
  label: string;
  type?: string;
  error?: string;
  className?: string,
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @prop { string } name - Input name and id
 * @prop { any } value - Input value
 * @prop { string | number| undefined } label - Input label
 * @prop { string | undefined } type - Input type
 * @prop { string | undefined} error - Error message to display
 * @prop { string | undefined}  - Custom styles
 * @prop { boolean | undefined} disabled - If input should be disabled
 * @prop { () => void } onChange - Function for onChange input
 */
export default function Input({
  name,
  value,
  label,
  type = "text",
  error = "",
  className = "",
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <div className={className}>
      <label className="block">
        <span className="block text-sm font-medium text-slate-600">
          {label}
        </span>
        <input
          className={`
            mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            ${
              error &&
              "border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            }
            `}
          id={name}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      <small className="text-red-500">{error}</small>
    </div>
  );
}
