// @flow

/** アクションハンドラ */
export type ActionHandler<T> = (action: T) => void;

/** アクションリスナー */
export interface Listener<T> {
  /** アクションハンドラを追加する */
  add(handler: ActionHandler<T>): void;
  /** アクションハンドラを削除する */
  remove(handler: ActionHandler<T>): void;
};