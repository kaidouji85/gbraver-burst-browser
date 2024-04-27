import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー バッテリー基本ルール説明
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const batteryRuleDescription = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「……と このように攻撃が当たるかは"],
    ["互いに出したバッテリーの大きさだけで決まるんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「なるほど シンプルながらも奥深いッスね」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ["ツバサ", "「バッテリーの攻防配分 これが基本かつ奥義だ"],
    ["では 今度は私が攻撃を仕掛けるので 同じ要領で回避してくれ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
