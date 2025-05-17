import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * SurviveSuperPowerWithGuardPropsを生成する
 * @returns 生成結果
 */
export const createSurviveSuperPowerWithGuardProps =
  (): SurviveSuperPowerWithGuardProps => ({
    state: {
      isIntroductionComplete: false,
    },
    stateAnimationCondition: null,
  });
