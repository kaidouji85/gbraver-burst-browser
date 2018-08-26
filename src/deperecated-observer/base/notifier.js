// @flow

/** アクション通知者 */
export interface Notifier<T> {
  /** アクションを通知する */
  notify(action: T): void;
};