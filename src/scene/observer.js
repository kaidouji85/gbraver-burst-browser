// @flow
import type {Action} from "./action";

/** イベント通知 */
export interface Observer {
  /** イベント通知をする */
  notify(action: Action): void;
}