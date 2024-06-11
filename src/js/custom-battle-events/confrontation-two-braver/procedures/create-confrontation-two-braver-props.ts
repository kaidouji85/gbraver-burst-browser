import { ConfrontationTwoBraverProps } from "../props";

/**
 * 「対決、二人のブレイバー！！」のカスタムプロパティを作成する
 * @returns 生成結果
 */
export function createConfrontationTwoBraverProps(): ConfrontationTwoBraverProps {
  return {
    eventState: {
      isIntroductionComplete: false,
      chapter: {
        type: "None",
      },
    },
  };
}
