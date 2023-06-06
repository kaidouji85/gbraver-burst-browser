import { MessageWindow } from "../src/js/game-dom/message-window";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

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
    position: "Left",
  });
  dom.visible(true);
  dom.messages(["左側表示です"]);
  return dom.getRootHTMLElement();
});

export const right: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
    position: "Right",
  });
  dom.visible(true);
  dom.messages(["右側表示です"]);
  return dom.getRootHTMLElement();
});

export const shinya: DOMStubStory = domStub((resources) => {
  const dom = new MessageWindow({
    resources,
    position: "Right",
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
    position: "Left",
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
    position: "Right",
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
    position: "Left",
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
    position: "Right",
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
    position: "Left",
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
    position: "Right",
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
    position: "Left",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  dom.visible(true);
  dom.face("Tsubasa");
  dom.faceVisible(true);
  dom.messages(["ツバサ", "「君の動きは、完全に見切った」"]);
  return dom.getRootHTMLElement();
});

export const doubleMessageWindows: DOMStubStory = domStub((resources) => {
  const root = document.createElement("div");
  const rightMessageWindow = new MessageWindow({
    resources,
    position: "Right",
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
    position: "Left",
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
