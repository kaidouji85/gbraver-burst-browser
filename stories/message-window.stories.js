// @flow
import {MessageWindow} from "../src/js/game-dom/message-window/message-window";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'message-window'
};

export const display: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  dom.visible(true);
  dom.messages([
    'hello world',
    '一般的にゲームのメッセージウインドウは3行のことが多いですね',
    'これでどう見えてるのか楽しみ'
  ]);
  return dom.getRootHTMLElement();
});