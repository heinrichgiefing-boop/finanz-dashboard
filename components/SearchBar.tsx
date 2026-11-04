"use client";

export default function SearchBar({
  value,
  onChange,
}: any) {
  return (
    <input
      className="border rounded p-2 w-full"
      placeholder="Artikel suchen..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}