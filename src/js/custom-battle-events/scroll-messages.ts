import type { MessageWindow } from "../game-dom/message-window/message-window";
import type { Stream } from "../stream/stream";
import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { BattleSceneSounds } from "../td-scenes/battle/sounds/sounds";
import type { PushWindow } from "../window/push-window";
import { waitUntilWindowPushWithStream } from "./wait-until-window-push";

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
 * @param paragraphs 表示するメッセージ
 * @return 処理が完了したら発火するPromise
 */
async function scrollMessages(messageWindow: MessageWindow, pushWindow: Stream<PushWindow>, sounds: BattleSceneSounds, paragraphs: Paragraph[]): Promise<void> {
  messageWindow.nextMessageIconVisible(true);

  for (let i = 0; i < paragraphs.length; i++) {
    sounds.sendMessage.sound.play();
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
 * @return 処理が完了したら発火するPromise
 */
export async function scrollLeftMessages(props: CustomBattleEventProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props.view.dom.leftMessageWindow, props.pushWindow, props.sounds, paragraphs);
}

/**
 * 右側メッセージウインドウで複数メッセージスクロール表示をする
 *
 * @param props イベントプロパティ
 * @param paragraphs 表示するメッセージ
 * @return 処理が完了したら発火するPromise
 */
export async function scrollRightMessages(props: CustomBattleEventProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props.view.dom.rightMessageWindow, props.pushWindow, props.sounds, paragraphs);
}