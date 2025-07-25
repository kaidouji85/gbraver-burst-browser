import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * Introductionを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayIntroduction = (
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) => {
  const { isIntroductionComplete } = props.state;
  const { mainTurnCount, isRetry } = props;
  return !isIntroductionComplete && mainTurnCount === 1 && !isRetry;
};
