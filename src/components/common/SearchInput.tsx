interface SearchInputProps {
  className?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // MEMO: カスタムイベントを追加
  onArrowUpDownKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEscapeKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  className,
  leftContent,
  rightContent,
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
      {leftContent && <div className="flex-none">{leftContent}</div>}
      <input
        type="text"
        placeholder="Search or Enter URL ..."
        className={`w-full px-3 py-2 text-lg rounded-md focus:outline-none focus:ring-2 ${className}`}
        autoFocus
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {rightContent && <div className="flex-none">{rightContent}</div>}
    </div>
  );
}
