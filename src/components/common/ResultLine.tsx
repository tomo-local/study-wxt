import ArrowLongRightIcon from "@heroicons/react/16/solid/ArrowLongRightIcon";
import WindowIcon from "@heroicons/react/16/solid/WindowIcon";
import ResultItem from "@/components/common/result/ResultItem";
import SquareIcon from "@/components/common/icon/SquareIcon";

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
      <ResultItem
        className={`text-gray-200 bg-gray-800 border-sky-500 ${
          isSelected && "bg-sky-500"
        } `}
        leftContent={
          <SquareIcon className={isSelected ? "bg-gray-200" : ""}>
            {item.icon ? (
              <img src={item.icon} alt="favicon" className="size-5" />
            ) : (
              <WindowIcon className="text-gray-400 size-5" />
            )}
          </SquareIcon>
        }
        rightContent={
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300">Go to Tab</span>
            <SquareIcon className={isSelected ? "bg-gray-200" : ""}>
              <ArrowLongRightIcon
                className={`size-5 ${
                  isSelected ? "text-gray-400" : "text-gray-200"
                }`}
              />
            </SquareIcon>
          </div>
        }
        isSelected={isSelected}
      >
        <span className="text-sm font-medium">{item.title}</span>
      </ResultItem>
    </li>
  );
}
export default ResultLine;
