// @flow

import type {Notifier} from "../base/notifier";
import type {DOMEvent} from "./action/index";

/** HTMLイベント通知者*/
export type DOMEventNotifier = Notifier<DOMEvent>;