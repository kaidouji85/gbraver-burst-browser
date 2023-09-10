import { all } from "../../../animation/all";
import { delay } from "../../../animation/delay";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { ShinBraverTD } from "../../../td-scenes/battle/view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../td-scenes/battle/view/td/armdozer-objects/wing-dozer";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { waitUntilWindowPush } from "../../wait-until-window-push";
import {synchronizedBow} from "../../synchronized-bow";

/**
 * 条件を満たした場合、気をつけ、礼をする
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
async function uprightBowIfNeed(props: CustomBattleEventProps): Promise<void> {
  const foundShinBraverTD = props.view.td.armdozerObjects.find(
    (v) => v.playerId === props.playerId,
  );
  const foundWingDozerTD = props.view.td.armdozerObjects.find(
    (v) => v.playerId !== props.playerId,
  );
  if (
    !(foundShinBraverTD instanceof ShinBraverTD) ||
    !(foundWingDozerTD instanceof WingDozerTD)
  ) {
    return;
  }

  const shinBraverTD: ShinBraverTD = foundShinBraverTD;
  const wingDozerTD: WingDozerTD = foundWingDozerTD;
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages(["姿勢を正して"]);
  await synchronizedBow(props).play();
  await waitUntilWindowPush(props);
  props.sounds.sendMessage.sound.play();
  props.view.dom.leftMessageWindow.scrollUp();
  props.view.dom.leftMessageWindow.messages(["礼！！」"]);
  await delay(500).play();
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  props.view.dom.rightMessageWindow.messages([
    "シンヤ",
    "「よろしくお願いします」",
  ]);
  await all(
    shinBraverTD.shinBraver
      .bowDown()
      .chain(delay(200))
      .chain(shinBraverTD.shinBraver.bowUp())
      .chain(delay(500))
      .chain(shinBraverTD.shinBraver.uprightToStand()),
    wingDozerTD.wingDozer
      .bowDown()
      .chain(delay(200))
      .chain(wingDozerTD.wingDozer.bowUp())
      .chain(delay(500))
      .chain(wingDozerTD.wingDozer.uprightToStand()),
  )
    .chain(delay(500))
    .play();
}

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function introduction(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「これより 操縦訓練を開始する"],
  ]);
  await uprightBowIfNeed(props);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「いい返事だな では早速はじめよう"],
    ["試合の基本は攻撃側 防御側でのバッテリーの出し合いだ"],
    ["大きいバッテリーを出した側の行動が成功するのだが"],
    ["これは実際にやってみた方が早いな"],
    ["シンヤ 私が防御に回るから 好きなように攻撃してくれ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    ["それじゃ遠慮なく行くッスよ ツバサ先輩」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
}
