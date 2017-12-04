// @flow
import type {Observer} from './observer';


/** アプリケーションの雛形 */
export interface Application {
  /** イベント通知 */
  observer: Observer;
}
