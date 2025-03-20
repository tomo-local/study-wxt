import React from "react";
import TabItem from "@/components/common/result/TabItem";
import SuggestionItem from "@/components/common/result/SuggestionItem";
import { Tab } from "@/types/chrome";
import { Suggestion } from "@/types/google";
import { ResultType } from "@/types/result";

type LineProps = {
  key: number;
  item: Tab | Suggestion;
  isSelected: boolean;
};

export default function ResultLine({ key, item, isSelected }: LineProps) {
  if (item.type === ResultType.Tab) {
    return <TabItem key={key} item={item as Tab} isSelected={isSelected} />;
  }

  if (item.type === ResultType.Google) {
    return (
      <SuggestionItem key={key} item={item as Suggestion} isSelected={isSelected} />
    );
  }

  return null;
}
