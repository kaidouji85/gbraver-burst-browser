import { fromEvent, map, merge, Observable } from "rxjs";

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: "PushDOM";
  /** イベントオブジェクト */
  event: Event;
};

/**
 * HTML押下ストリーム
 * @param dom 押下判定のHTML要素
 * @returns ストリーム
 */
export function domPushStream(dom: HTMLElement): Observable<PushDOM> {
  const mouseDown: Observable<PushDOM> = fromEvent<MouseEvent>(
    dom,
    "mousedown",
  ).pipe(
    map((event) => {
      return {
        type: "PushDOM",
        event,
      };
    }),
  );
  const touchStart: Observable<PushDOM> = fromEvent<TouchEvent>(
    dom,
    "touchstart",
  ).pipe(
    map((event) => {
      return {
        type: "PushDOM",
        event,
      };
    }),
  );
  return merge(mouseDown, touchStart);
}

/**
 * HTMLクリックストリーム
 * @param dom 押下判定のHTML要素
 * @returns ストリーム
 */
export function domClickStream(dom: HTMLElement): Observable<PushDOM> {
  return fromEvent<MouseEvent>(dom, "click").pipe(
    map((event) => {
      return {
        type: "PushDOM",
        event,
      };
    }),
  );
}
