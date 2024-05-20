import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「……と このように${wbr}攻撃が当たるかは`],
    [`互いに出した${wbr}バッテリー${wbr}の大きさ${wbr}だけで決まるんだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「なるほど${wbr} シンプルながらも${wbr}奥深いッスね」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ["ツバサ", `「バッテリーの${wbr}攻防配分${wbr} これが基本かつ${wbr}奥義だ`],
    [
      `では 今度は私が${wbr}攻撃を仕掛けるので${wbr} 同じ要領で${wbr}回避してくれ」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
