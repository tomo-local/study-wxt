import ArrowLongRightIcon from "@heroicons/react/16/solid/ArrowLongRightIcon";
import WindowIcon from "@heroicons/react/16/solid/WindowIcon";
import CommonItem from "@/components/common/result/CommonItem";
import SquareIcon from "@/components/common/icon/SquareIcon";
import { Suggestion } from "@/types/google";

export default function SuggestionItem({
  key,
  item,
  isSelected,
}: {
  key: number;
  item: Suggestion;
  isSelected: boolean;
}) {
  return (
    <li key={key}>
      <CommonItem
        className={`text-gray-200 bg-gray-800 border-sky-500 ${
          isSelected && "bg-sky-500"
        } `}
        leftContent={
          <SquareIcon className={isSelected ? "bg-gray-200" : ""}>
            <WindowIcon className="text-gray-400 size-5" />
          </SquareIcon>
        }
        rightContent={
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300">Go to Search</span>
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
        <div className="relative flex-col items-center justify-center inline-block max-w-fit">
          <div className="text-sm truncate max-w-[224px] md:max-w-md whitespace-nowrap">
            {item.title}
          </div>
        </div>
      </CommonItem>
    </li>
  );
}
