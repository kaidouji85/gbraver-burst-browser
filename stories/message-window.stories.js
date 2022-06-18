// @flow
import {MessageWindow} from "../src/js/game-dom/message-window/message-window";
import {domStub} from "./stub/dom-stub";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'message-window'
};

export const display: DOMStubStory = domStub(()=> {
  const dom = new MessageWindow();
  return dom.getRootHTMLElement();
});