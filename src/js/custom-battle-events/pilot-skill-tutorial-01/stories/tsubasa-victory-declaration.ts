import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ツバサ先輩勝利宣言
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function tshubasaVictoryDeclaration(
  props: Readonly<CustomBattleEventProps>
): Animate {
  return process(() => {
    props.sounds.sendMessage.sound.play();
    props.view.dom.leftMessageWindow.visible(true);
    props.view.dom.leftMessageWindow.messages([
      "ツバサ",
      "「この瞬間 私の勝ちが確定した」"
    ]);
    props.view.dom.leftMessageWindow.scrollUp();
    props.view.dom.leftMessageWindow.faceVisible(false);
    props.view.dom.leftMessageWindow.nextMessageIconVisible(false);
  })
    .chain(delay(600))
    .chain(process(() => {
      props.view.dom.leftMessageWindow.visible(false);
    }));
}