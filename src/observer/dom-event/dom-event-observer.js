// @flow
import {Observer} from "../base/observer";
import type {DOMEvent} from "./action/index";
import {bindDOMEvent} from "./dom-event-binder";

/** HTMLイベントのオブザーバ */
export class DOMEventObserver extends Observer<DOMEvent> {
  constructor(renderDom: HTMLElement) {
    super();
    bindDOMEvent(this, renderDom);
  }
}