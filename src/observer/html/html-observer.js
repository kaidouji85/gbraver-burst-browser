// @flow
import {Observer} from "../base/observer";
import type {HtmlAction} from "../../action/html";
import {bindHtmlEvent} from "./html-event-binder";

/** HTMLイベントのオブザーバ */
export class HtmlObserver extends Observer<HtmlAction> {
  constructor() {
    super();
    bindHtmlEvent(this);
  }
}