'use client';

export const Select = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8869f5] focus:border-[#8869f5] outline-[#8869f5]  block w-full p-2.5"
    >
      {options.map((option) => (
        <option
          key={option.key}
          className="bg-[#8869f5] hover:bg-[#8869f5] focus:ring-[#8869f5]"
          value={option.key}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};
