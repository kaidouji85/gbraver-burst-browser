import { Observable } from "rxjs";

import { MessageWindow } from "../game-dom/message-window";
import { SEPlayer } from "../se/se-player";
import  { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { BattleSceneSounds } from "../td-scenes/battle/sounds";
import {waitUntilWindowPushWithStream} from "../wait/wait-until-window-push-with-stream";
import { PushWindow } from "../window/push-window";

/** メッセージウインドウのパラグラフ */
type Paragraph = string[];

/**
 * 複数メッセージをスクロール表示する
 * 画面押下したら、次のメッセージがスクロール表示される
 * 全てのメッセージを表示した後に画面押下したら、本関数の処理が完了する
 *
 * @param messageWindow メッセージウインドウ
 * @param pushWindow 画面押下ストリーム
 * @param sounds 戦闘シーンで利用する音声データ
 * @param se SE再生オブジェクト
 * @param paragraphs 表示するメッセージ
 * @returns 処理が完了したら発火するPromise
 */
async function scrollMessages(
  messageWindow: MessageWindow,
  pushWindow: Observable<PushWindow>,
  sounds: BattleSceneSounds,
  se: SEPlayer,
  paragraphs: Paragraph[],
): Promise<void> {
  messageWindow.nextMessageIconVisible(true);

  for (let i = 0; i < paragraphs.length; i++) {
    se.play(sounds.sendMessage);
    messageWindow.scrollUp();
    messageWindow.messages(paragraphs[i]);
    await waitUntilWindowPushWithStream(pushWindow);
  }

  messageWindow.nextMessageIconVisible(false);
}

/**
 * 左側メッセージウインドウで複数メッセージスクロール表示をする
 *
 * @param props イベントプロパティ
 * @param paragraphs 表示するメッセージ
 * @returns 処理が完了したら発火するPromise
 */
export async function scrollLeftMessages(
  props: CustomBattleEventProps,
  paragraphs: Paragraph[],
): Promise<void> {
  await scrollMessages(
    props.view.dom.leftMessageWindow,
    props.pushWindow,
    props.sounds,
    props.se,
    paragraphs,
  );
}

/**
 * 右側メッセージウインドウで複数メッセージスクロール表示をする
 *
 * @param props イベントプロパティ
 * @param paragraphs 表示するメッセージ
 * @returns 処理が完了したら発火するPromise
 */
export async function scrollRightMessages(
  props: CustomBattleEventProps,
  paragraphs: Paragraph[],
): Promise<void> {
  await scrollMessages(
    props.view.dom.rightMessageWindow,
    props.pushWindow,
    props.sounds,
    props.se,
    paragraphs,
  );
}
