import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ツバサ先輩勝利宣言
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function tsubasaVictoryDeclaration(
  props: Readonly<CustomBattleEventProps>
): Animate {
  const messageWindow = props.view.dom.enemyCryMessageWindow;
  return process(() => {
    props.sounds.sendMessage.sound.play();
    messageWindow.visible(true);
    messageWindow.lighten();
    messageWindow.face("Tsubasa");
    messageWindow.faceVisible(true);
    messageWindow.messages(["この瞬間 私の勝利が確定した"]);
    messageWindow.scrollUp();
    messageWindow.nextMessageIconVisible(false);
  });
}
