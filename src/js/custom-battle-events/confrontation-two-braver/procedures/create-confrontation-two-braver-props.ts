import { ConfrontationTwoBraverProps } from "../props";

/**
 * 「対決、二人のブレイバー！！」のカスタムプロパティを作成する
 * @return 生成結果
 */
export function createConfrontationTwoBraverProps(): ConfrontationTwoBraverProps {
  return {
    state: {
      isIntroductionComplete: false,
      chapter: {
        type: "None",
      },
    },
  };
}
