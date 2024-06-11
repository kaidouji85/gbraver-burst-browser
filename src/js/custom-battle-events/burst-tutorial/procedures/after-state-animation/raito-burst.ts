import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { BurstTutorialProps } from "../../props";

/** ライト バースト発動 */
export const raitoBurst: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) =>
    isEnemyBurstActivatedFromCurrentState(props)
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null,
];
