import { matchColors } from "@/components/site/colorPalet";

export const getMatchingColor = (matching_score: number) => {
  let matchingColor = matchColors.more89;

  switch (true) {
    case matching_score < 89 && matching_score >= 76:
      matchingColor = matchColors.between76and89;
      break;
    case matching_score < 76 && matching_score >= 60:
      matchingColor = matchColors.between60and75;
      break;
    case matching_score < 60:
      matchingColor = matchColors.less59;
      break;
    default:
      matchingColor = matchColors.more89;
  }

  return matchingColor;
};
