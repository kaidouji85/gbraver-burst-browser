import {
  attackBatteryCaptionInnerHtml
} from "../src/js/custom-battle-events/battery-system-tutorial/dom/attack-battery-caption-inner-html";
import {
  defenseBatteryCaptionInnerHtml
} from "../src/js/custom-battle-events/battery-system-tutorial/dom/defense-battery-caption-inner-html";
import {MessageWindow} from "../src/js/game-dom/message-window";
import {ROOT_CLASS} from "../src/js/game-dom/message-window/dom/class-name";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: "message-window",
};

export const threeLine: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messages([
    "hello world",
    "一般的にゲームのメッセージウインドウは3行のことが多いですね",
    "これでどう見えてるのか楽しみ",
  ]);
  return dom.getRootHTMLElement();
});

export const twoLine: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messages(["2行表示します", "よっこいしょ"]);
  return dom.getRootHTMLElement();
});

export const oneLine: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messages(["1行だけ表示"]);
  return dom.getRootHTMLElement();
});

export const zeroLine: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messages([]);
  return dom.getRootHTMLElement();
});

export const left: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
    type: "Left",
  });
  dom.visible(true);
  dom.messages(["左側表示です"]);
  return dom.getRootHTMLElement();
});

export const right: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
    type: "Right",
  });
  dom.visible(true);
  dom.messages(["右側表示です"]);
  return dom.getRootHTMLElement();
});

export const shinya: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const shinyaRight: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const gai: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const gaiRight: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const raito: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const raitoRight: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const tsubasa: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const tsubasaRight: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const yuuya: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const yuuyaRight: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const doubleMessageWindows: DOMStubStory = domStub((resources) => {
  const root = document.createElement("div");
  const rightMessageWindow = new MessageWindow({
    resources,
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
    resources,
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

export const playerShout: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const enemyShout: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
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

export const messagesInInnerHTML: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messagesInInnerHTML(`
    <div class="${ROOT_CLASS}__paragraph">HTMLを直接指定しています。</div>
    <div class="${ROOT_CLASS}__paragraph">これで改行されたはず。</div>
  `);
  return dom.getRootHTMLElement();
});

export const attackBatteryCaption: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messagesInInnerHTML(attackBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

export const defenseBatteryCaption: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
  });
  dom.visible(true);
  dom.messagesInInnerHTML(defenseBatteryCaptionInnerHtml(resources));
  return dom.getRootHTMLElement();
});

export const playerYorosikuOnegaishimasu: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
    type: "PlayerShout",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  dom.visible(true);
  dom.lighten();
  dom.face("Shinya");
  dom.faceVisible(true);
  dom.messagesInInnerHTML("よろしく<wbr>お願いします");
  dom.nextMessageIconVisible(false);
  return dom.getRootHTMLElement();
});
