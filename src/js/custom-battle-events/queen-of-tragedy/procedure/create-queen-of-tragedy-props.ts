import { QueenOfTragedyProps } from "../props";

/**
 * 悲劇の女王プロパティを生成する
 * @return 生成された悲劇の女王プロパティ
 */
export const createQueenOfTragedyProps = (): QueenOfTragedyProps => ({
  eventState: {
    isIntroductionComplete: false,
    isStoryOfTurn3Complete: false,
    chapter: { type: "None" },
  },
});
