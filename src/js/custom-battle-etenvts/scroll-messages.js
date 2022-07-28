// @flow
import type {MessageWindow} from "../game-dom/message-window/message-window";
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";
import type {Stream} from "../stream/stream";
import type {PushWindow} from "../window/push-window";
import {waitUntilWindowPushWithStream} from "./wait-until-window-push";

/** メッセージウインドウのパラグラフ */
type Paragraph = string[];

/**
 * 複数メッセージをスクロール表示する
 * 画面押下したら、次のメッセージがスクロール表示される
 * 全てのメッセージを表示した後に画面押下したら、本関数の処理が完了する
 *
 * @param messageWindow メッセージウインドウ
 * @param pushWindow 画面押下ストリーム
 * @param paragraphs 表示するメッセージ
 * @return 処理が完了したら発火するPromise
 */
async function scrollMessages(messageWindow: MessageWindow, pushWindow: Stream<PushWindow>, paragraphs: Paragraph[]): Promise<void> {
  for(let i=0; i < paragraphs.length; i ++) {
    messageWindow.scrollUp();
    messageWindow.messages(paragraphs[i]);
    await waitUntilWindowPushWithStream(pushWindow);
  }
}

/**
 * 左側メッセージウインドウで複数メッセージスクロール表示をする
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 * @param paragraphs 表示するメッセージ
 * @return 処理が完了したら発火するPromise
 */
export async function scrollLeftMessages(props: BattleSceneProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props.view.dom.leftMessageWindow, props.pushWindow, paragraphs);
}

/**
 * 右側メッセージウインドウで複数メッセージスクロール表示をする
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 * @param paragraphs 表示するメッセージ
 * @return 処理が完了したら発火するPromise
 */
export async function scrollRightMessages(props: BattleSceneProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props.view.dom.rightMessageWindow, props.pushWindow, paragraphs);
}