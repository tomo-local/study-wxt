import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCompositionStart: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  value,
  onChange,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: SearchBarProps) {
  return (
    <div className="flex items-center p-2 space-x-2 bg-gray-800">
      <span>
        <MagnifyingGlassIcon className="size-5" />
      </span>
      <input
        type="text"
        autoFocus
        className="w-full p-2 text-white bg-transparent rounded-lg focus:outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        placeholder="Search or Enter URL..."
      />
    </div>
  );
}
