import ArrowLongRightIcon from "@heroicons/react/16/solid/ArrowLongRightIcon";
import { ListContext } from "@/machine/searchList";

type ResultLineProps = {
  key: string;
  item: ListContext;
  index: number;
  selectedIndex: number;
  onMouseEnter: (index: number) => void;
  onClick: () => void;
};

function ResultLine({
  key,
  item,
  index,
  selectedIndex,
  onMouseEnter,
  onClick,
}: ResultLineProps) {
  return (
    <li key={key}>
      <button
        key={item.type === "tab" ? item.id : item.url}
        className={`${
          selectedIndex === index && "bg-gray-700"
        } border-gray-700 rounded-lg flex w-full space-x-3 space-y-1 p-3 text-left hover:bg-gray-700`}
        onMouseEnter={() => onMouseEnter(index)}
        onClick={onClick}
      >
        <div className="flex items-center justify-center flex-none h-full justify-items-center">
          {item.type === "tab" &&
            item.icon && ( // アイコンを表示
              <img src={item.icon} alt="icon" className="size-5" />
            )}
          {item.type === "history" && (
            <img
              src={`http://www.google.com/s2/favicons?domain=${item.url}`}
              alt=""
              className="size-5"
            />
          )}
          {item.type === "search" && (
            <img
              src={`http://www.google.com/s2/favicons?domain=${item.url}`}
              alt=""
              className="size-5"
            />
          )}
        </div>
        <div className="text-left truncate grow text-nowrap">{item.title}</div>
        {item.type === "tab" && (
          <div className="flex items-center justify-between flex-none w-28">
            <div className="text-left truncate text-nowrap">Switch to Tab</div>
            <span>
              <div className="flex items-center justify-center p-1 bg-gray-900 rounded-lg">
                <ArrowLongRightIcon className="size-4" />
              </div>
            </span>
          </div>
        )}
        {item.type === "history" && item.url && (
          <div className="grow">
            <span className="text-gray-500 truncate text-none">
              {new URL(item.url).hostname}
            </span>
          </div>
        )}
      </button>
    </li>
  );
}
export default ResultLine;
