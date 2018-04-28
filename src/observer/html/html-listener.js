// @flow

import type {Listener} from "../base/listener";
import type {HtmlAction} from "../../action/html";

/** HTMLイベントのリスナー */
export type HtmlListener = Listener<HtmlAction>;