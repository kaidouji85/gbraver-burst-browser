import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyAdvantage } from "../../../is-enemy-advantage";
import { isEvenMatch } from "../../../is-even-match";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { isPlayerAdvantage } from "../../../is-player-advantage";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaPilotSkillWhenEvenMatch } from "../../animation/shinya-pilot-skill-when-even-match";
import { shinyaPilotSkillWhenShinyaHasAdvantage } from "../../animation/shinya-pilot-skill-when-shinya-has-advantage";
import { shinyaPilotSkillWhenYuuyaHasAdvantage } from "../../animation/shinya-pilot-skill-when-yuuya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤパイロットスキル カスタムステートアニメーション */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const separatedPlayers = separatePlayersFromCurrentState(props);
    return isPlayerPilotSkillActivated(props) &&
      separatedPlayers &&
      isPlayerAdvantage(separatedPlayers)
      ? shinyaPilotSkillWhenShinyaHasAdvantage(props)
      : null;
  },
  (props) => {
    const separatedPlayers = separatePlayersFromCurrentState(props);
    return isPlayerPilotSkillActivated(props) &&
      separatedPlayers &&
      isEnemyAdvantage(separatedPlayers)
      ? shinyaPilotSkillWhenYuuyaHasAdvantage(props)
      : null;
  },
  (props) => {
    const separatedPlayers = separatePlayersFromCurrentState(props);
    return isPlayerPilotSkillActivated(props) &&
      separatedPlayers &&
      isEvenMatch(separatedPlayers)
      ? shinyaPilotSkillWhenEvenMatch(props)
      : null;
  },
];
