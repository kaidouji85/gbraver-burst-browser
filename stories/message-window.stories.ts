import { StoryFn } from "@storybook/html";

import { attackBatteryCaptionInnerHtml } from "../src/js/custom-battle-events/battery-system-tutorial/dom/attack-battery-caption-inner-html";
import { defenseBatteryCaptionInnerHtml } from "../src/js/custom-battle-events/battery-system-tutorial/dom/defense-battery-caption-inner-html";
import { yoroshikuOnegaiShimasu } from "../src/js/custom-battle-events/yoroshiku-onegai-shimasu";
import { wbr } from "../src/js/dom/wbr";
import { MessageWindow } from "../src/js/game-dom/message-window";
import { ROOT_CLASS } from "../src/js/game-dom/message-window/dom/class-name";
import { highlight } from "../src/js/game-dom/message-window/dom/highlight";
import { domStub } from "./stub/dom-stub";

export default {
  title: "message-window",
};

/** 3行表示 */
export const threeLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages([
    "hello world",
    "一般的にゲームのメッセージウインドウは3行のことが多いですね",
    "これでどう見えてるのか楽しみ",
  ]);
  return dom.getRootHTMLElement();
});

/** 2行表示 */
export const twoLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages(["2行表示します", "よっこいしょ"]);
  return dom.getRootHTMLElement();
});

/** 1行表示 */
export const oneLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages(["1行だけ表示"]);
  return dom.getRootHTMLElement();
});

/** 0行表示 */
export const zeroLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages([]);
  return dom.getRootHTMLElement();
});

/** 左側表示 */
export const left: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
  });
  dom.visible(true);
  dom.messages(["左側表示です"]);
  return dom.getRootHTMLElement();
});

/** 右側表示 */
export const right: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
  });
  dom.visible(true);
  dom.messages(["右側表示です"]);
  return dom.getRootHTMLElement();
});

/** シンヤ（左側表示） */
export const shinya: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Shinya");
  dom.faceVisible(true);
  dom.messages(["シンヤ", "「力を貸してくれ、シンブンレイバー」"]);
  return dom.getRootHTMLElement();
});

/** シンヤ（右側表示） */
export const shinyaRight: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Shinya");
  dom.faceVisible(true);
  dom.messages(["シンヤ", "「力を貸してくれ、シンブンレイバー」"]);
  return dom.getRootHTMLElement();
});

/** ガイ（左側表示） */
export const gai: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Gai");
  dom.faceVisible(true);
  dom.messages(["ガイ", "「シンヤ、お前の力はその程度か」"]);
  return dom.getRootHTMLElement();
});

/** ガイ（右側表示） */
export const gaiRight: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Gai");
  dom.faceVisible(true);
  dom.messages(["ガイ", "「シンヤ、お前の力はその程度か」"]);
  return dom.getRootHTMLElement();
});

/** ライト（左側表示） */
export const raito: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Raito");
  dom.faceVisible(true);
  dom.messages(["ライト", "「難波の底力、見せたるでぇ」"]);
  return dom.getRootHTMLElement();
});

/** ライト（右側表示） */
export const raitoRight: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Raito");
  dom.faceVisible(true);
  dom.messages(["ライト", "「難波の底力、見せたるでぇ」"]);
  return dom.getRootHTMLElement();
});

/** ツバサ（左側表示） */
export const tsubasa: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Tsubasa");
  dom.faceVisible(true);
  dom.messages(["ツバサ", "「君の動きは、完全に見切った」"]);
  return dom.getRootHTMLElement();
});

/** ツバサ（右側表示） */
export const tsubasaRight: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Tsubasa");
  dom.faceVisible(true);
  dom.messages(["ツバサ", "「君の動きは、完全に見切った」"]);
  return dom.getRootHTMLElement();
});

/** ユウヤ（左側表示） */
export const yuuya: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Yuuya");
  dom.faceVisible(true);
  dom.messages([
    "ユウヤ",
    "「愛機にブレイバーと名付ける奴が 俺以外にもいるとはな」",
  ]);
  return dom.getRootHTMLElement();
});

/** ユウヤ（右側表示） */
export const yuuyaRight: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Yuuya");
  dom.faceVisible(true);
  dom.messages([
    "ユウヤ",
    "「愛機にブレイバーと名付ける奴が 俺以外にもいるとはな」",
  ]);
  return dom.getRootHTMLElement();
});

/** メッセージウインドウを2つ並べる */
export const doubleMessageWindows: StoryFn = domStub((params) => {
  const root = document.createElement("div");
  const rightMessageWindow = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  rightMessageWindow.visible(true);
  rightMessageWindow.faceVisible(true);
  rightMessageWindow.face("Shinya");
  rightMessageWindow.messages(["シンヤ", "「よろしくお願いします」"]);
  root.appendChild(rightMessageWindow.getRootHTMLElement());
  const leftMessageWindow = new MessageWindow({
    ...params,
    type: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  leftMessageWindow.visible(true);
  leftMessageWindow.faceVisible(true);
  leftMessageWindow.face("Tsubasa");
  leftMessageWindow.darken();
  leftMessageWindow.messages(["ツバサ", "「姿勢を正して、礼!!」"]);
  root.appendChild(leftMessageWindow.getRootHTMLElement());
  return root;
});

/** プレイヤー側の叫びウインドウ */
export const playerShout: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "PlayerShout",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.faceVisible(true);
  dom.face("Gai");
  dom.messages(["俺だって やれるんだ"]);
  return dom.getRootHTMLElement();
});

/** 敵側の叫びウインドウ */
export const enemyShout: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "EnemyShout",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.faceVisible(true);
  dom.face("Tsubasa");
  dom.messages(["この瞬間 私の勝利が確定した"]);
  return dom.getRootHTMLElement();
});

/** innerHTMLでメッセージを指定 */
export const messagesInInnerHTML: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(`
    <div class="${ROOT_CLASS}__paragraph">HTMLを直接指定しています。</div>
    <div class="${ROOT_CLASS}__paragraph">これで改行されたはず。</div>
  `);
  return dom.getRootHTMLElement();
});

/** バッテリーシステムチュートリアルの攻撃バッテリーキャプション */
export const attackBatteryCaption: StoryFn = domStub((params) => {
  const { resources } = params;
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(attackBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

/** バッテリーシステムチュートリアルの防御バッテリーキャプション */
export const defenseBatteryCaption: StoryFn = domStub((params) => {
  const { resources } = params;
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(defenseBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

/** プレイヤー側の「よろしくお願いします」 */
export const playerYorosikuOnegaishimasu: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "PlayerShout",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.lighten();
  dom.face("Shinya");
  dom.faceVisible(true);
  dom.messagesInInnerHTML(yoroshikuOnegaiShimasu());
  dom.nextMessageIconVisible(false);
  return dom.getRootHTMLElement();
});

/** ハイライト */
export const highlightText: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.face("Tsubasa");
  dom.faceVisible(true);
  dom.messages([highlight(`攻撃と防御が同じ数字${wbr}ならダメージ半減`)]);
  return dom.getRootHTMLElement();
});
