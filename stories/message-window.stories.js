// @flow
import {MessageWindow} from "../src/js/game-dom/message-window/message-window";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'message-window'
};

export const threeLine: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  dom.visible(true);
  dom.messages([
    'hello world',
    '一般的にゲームのメッセージウインドウは3行のことが多いですね',
    'これでどう見えてるのか楽しみ'
  ]);
  return dom.getRootHTMLElement();
});

export const twoLine: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  dom.visible(true);
  dom.messages([
    '2行表示します',
    'よっこいしょ'
  ]);
  return dom.getRootHTMLElement();
});

export const oneLine: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  dom.visible(true);
  dom.messages([
    '1行だけ表示',
  ]);
  return dom.getRootHTMLElement();
});

export const zeroLine: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  dom.visible(true);
  dom.messages([]);
  return dom.getRootHTMLElement();
});