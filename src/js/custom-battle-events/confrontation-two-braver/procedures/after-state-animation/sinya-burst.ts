import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ バースト発動 カスタムステートアニメ終了 */
export const playerActivateSkill: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return isPlayerBurstActivated(props)
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null;
  },
];
