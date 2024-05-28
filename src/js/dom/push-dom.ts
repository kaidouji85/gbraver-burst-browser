import { fromEvent, map, merge, Observable } from "rxjs";

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: "PushDOM";
  /** イベントオブジェクト */
  event: MouseEvent | TouchEvent;
};

/**
 * HTML押下ストリーム
 * @param dom 押下判定のHTML要素
 * @returns ストリーム
 */
export const domPushStream = (dom: HTMLElement): Observable<PushDOM> =>
  merge(
    fromEvent<MouseEvent>(dom, "mousedown").pipe(
      map((event) => ({ type: "PushDOM", event }) as const),
    ),
    fromEvent<TouchEvent>(dom, "touchstart").pipe(
      map((event) => ({ type: "PushDOM", event }) as const),
    ),
  );

/**
 * HTMLクリックストリーム
 * @param dom 押下判定のHTML要素
 * @returns ストリーム
 */
export const domClickStream = (dom: HTMLElement): Observable<PushDOM> =>
  fromEvent<MouseEvent>(dom, "click").pipe(
    map((event) => ({
      type: "PushDOM",
      event,
    })),
  );
