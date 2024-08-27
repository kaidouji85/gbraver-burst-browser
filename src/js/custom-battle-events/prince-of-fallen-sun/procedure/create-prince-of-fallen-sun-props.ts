import { PrinceOfFallenSunProps } from "../props";

/**
 * 落日の王子プロパティを作成する
 * @returns 生成結果
 */
export function createPrinceOfFallenSunProps(): PrinceOfFallenSunProps {
  return {
    eventState: {
      isIntroductionComplete: false,
      isSunOfNoblePlay: false,
    },
  };
}
