interface SelectProps {
  name: string;
  value: string;
  defaultValue?: { id: string; label: string };
  label: string;
  list: Array<{ id: string; label: string }>;
  error?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * @prop { string } name - Input name and id
 * @prop { any } value - Input value
 * @prop { string | undefined } defaultValue - Default value from select
 * @prop { string } label - Input label
 * @prop { Array<string> } list - Items to drop down list
 * @prop { string | undefined} error - Error message to display
 * @prop { () => void } onChange - Function for onChange input
 * @prop { boolean | undefined } disabled - Input disabled
 */
export default function SelectInputById({
  name,
  value,
  defaultValue,
  label,
  list,
  error,
  disabled = false,
  onChange,
}: SelectProps) {
  return (
    <div className={`form-floating ${name}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`
          rounded-md mt-1 block w-full px-3 py-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          ${
            error &&
            "border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          }
          `}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value={defaultValue?.id || ""}>
          {defaultValue?.label || "Seleccionar"}
        </option>
        {list &&
          list.map((item, i) => (
            <option key={i} value={item.id}>
              {item.label}
            </option>
          ))}
      </select>
      <small>{error}</small>
    </div>
  );
}
