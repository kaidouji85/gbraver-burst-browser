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
  return process(() => {
    props.sounds.sendMessage.sound.play();
    props.view.dom.leftMessageWindow.visible(true);
    props.view.dom.leftMessageWindow.lighten();
    props.view.dom.leftMessageWindow.face("Tsubasa");
    props.view.dom.leftMessageWindow.faceVisible(true);
    props.view.dom.leftMessageWindow.messages([
      "ツバサ",
      "「この勝負 もらった」",
    ]);
    props.view.dom.leftMessageWindow.scrollUp();
    props.view.dom.leftMessageWindow.nextMessageIconVisible(false);
  });
}
