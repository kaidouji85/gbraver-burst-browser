import { fromEvent, map, merge, Observable } from "rxjs";

/** window押下情報 */
export type PushWindow = {
  type: "PushWindow";
  event: Event;
};

/**
 * window押下ストリームを生成する
 *
 * @returns window押下ストリーム
 */
export function pushWindowsStream(): Observable<PushWindow> {
  const click: Observable<PushWindow> = fromEvent<MouseEvent>(
    window,
    "mousedown",
    {
      passive: false,
    },
  ).pipe(
    map((event) => ({
      type: "PushWindow",
      event,
    })),
  );
  const touchStart: Observable<PushWindow> = fromEvent<TouchEvent>(
    window,
    "touchstart",
    {
      passive: false,
    },
  ).pipe(
    map((event) => ({
      type: "PushWindow",
      event,
    })),
  );
  return merge(click, touchStart);
}
