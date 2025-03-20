import ArrowLongRightIcon from "@heroicons/react/16/solid/ArrowLongRightIcon";
import WindowIcon from "@heroicons/react/16/solid/WindowIcon";

type ListContext = {
  id: number;
  title: string;
  url: string;
  icon: string;
};

function ResultLine({
  key,
  item,
  isSelected,
}: {
  key: number;
  item: ListContext;
  isSelected: boolean;
}) {
  return (
    <li key={key}>
      <button
        className={`
        flex items-center justify-between w-full px-4 py-2 text-left text-gray-200 bg-gray-800 rounded-lg shadow-xl border-sky-500
        ${isSelected ? "bg-sky-500" : ""}
        `}
      >
        <div className="flex flex-col flex-1">
          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-md ${
                isSelected && "bg-gray-600"
              }`}
            >
              {item.icon ? (
                <img src={item.icon} alt="favicon" className="w-4 h-4" />
              ) : (
                <WindowIcon className="text-gray-400 size-5" />
              )}
            </div>
            <span className="text-base">{item.title}</span>
          </div>
        </div>
        <ArrowLongRightIcon className="w-4 h-4 text-gray-400" />
      </button>
    </li>
  );
}
export default ResultLine;
