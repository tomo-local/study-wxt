import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchInputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onArrowUpDownKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEscapeKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  onFocus,
  onBlur,
  onChange,
  onArrowUpDownKeyDown,
  onEscapeKeyDown,
  onTabKeyDown,
  onEnterKeyDown,
}: SearchInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onEscapeKeyDown?.(e);
    }

    if (e.key.includes("Arrow")) {
      e.preventDefault();
      onArrowUpDownKeyDown?.(e);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      onTabKeyDown?.(e);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      onEnterKeyDown?.(e);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
      <input
        type="text"
        placeholder="Search or Enter URL ..."
        className="w-full px-3 py-2 text-lg text-gray-200 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        autoFocus
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
