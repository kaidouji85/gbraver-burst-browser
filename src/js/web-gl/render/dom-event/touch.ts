import { fromEvent, map, Observable } from "rxjs";

/** タッチスタート */
export type TouchStart = {
  type: "touchStart";
  event: TouchEvent;
};

/** タッチムーブ */
export type TouchMove = {
  type: "touchMove";
  event: TouchEvent;
};

/** タッチエンドイベント */
export type TouchEnd = {
  type: "touchEnd";
  event: TouchEvent;
};

/**
 * タッチスタートストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @returns ストリーム
 */
export function createTouchStartStream(
  renderDom: HTMLElement,
): Observable<TouchStart> {
  return fromEvent<TouchEvent>(renderDom, "touchstart").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "touchStart",
        event: v,
      };
    }),
  );
}

/**
 * タッチムーブストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @returns ストリーム
 */
export function createTouchMoveStream(
  renderDom: HTMLElement,
): Observable<TouchMove> {
  return fromEvent<TouchEvent>(renderDom, "touchmove").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "touchMove",
        event: v,
      };
    }),
  );
}

/**
 * タッチエンドストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @returns ストリーム
 */
export function createTouchEndStream(
  renderDom: HTMLElement,
): Observable<TouchEnd> {
  return fromEvent<TouchEvent>(renderDom, "touchend").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "touchEnd",
        event: v,
      };
    }),
  );
}
