import { StoryFn } from "@storybook/html";

import { attackBatteryCaptionInnerHtml } from "../src/js/custom-battle-events/battery-system-tutorial/dom/attack-battery-caption-inner-html";
import { defenseBatteryCaptionInnerHtml } from "../src/js/custom-battle-events/battery-system-tutorial/dom/defense-battery-caption-inner-html";
import { yoroshikuOnegaiShimasu } from "../src/js/custom-battle-events/yoroshiku-onegai-shimasu";
import { MessageWindow } from "../src/js/game-dom/message-window";
import { ROOT_CLASS } from "../src/js/game-dom/message-window/dom/class-name";
import { domStub } from "./stub/dom-stub";

export default {
  title: "message-window",
};

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

export const twoLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages(["2行表示します", "よっこいしょ"]);
  return dom.getRootHTMLElement();
});

export const oneLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages(["1行だけ表示"]);
  return dom.getRootHTMLElement();
});

export const zeroLine: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messages([]);
  return dom.getRootHTMLElement();
});

export const left: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Left",
  });
  dom.visible(true);
  dom.messages(["左側表示です"]);
  return dom.getRootHTMLElement();
});

export const right: StoryFn = domStub((params) => {
  const dom = new MessageWindow({
    ...params,
    type: "Right",
  });
  dom.visible(true);
  dom.messages(["右側表示です"]);
  return dom.getRootHTMLElement();
});

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

export const messagesInInnerHTML: StoryFn = domStub((params) => {
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(`
    <div class="${ROOT_CLASS}__paragraph">HTMLを直接指定しています。</div>
    <div class="${ROOT_CLASS}__paragraph">これで改行されたはず。</div>
  `);
  return dom.getRootHTMLElement();
});

export const attackBatteryCaption: StoryFn = domStub((params) => {
  const { resources } = params;
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(attackBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

export const defenseBatteryCaption: StoryFn = domStub((params) => {
  const { resources } = params;
  const dom = new MessageWindow(params);
  dom.visible(true);
  dom.messagesInInnerHTML(defenseBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

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
