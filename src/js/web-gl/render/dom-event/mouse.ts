import { fromEvent, map, Observable } from "rxjs";

/** マウスダウン */
export type MouseDown = {
  type: "mouseDown";
  event: MouseEvent;
};

/** マウスムーブ */
export type MouseMove = {
  type: "mouseMove";
  event: MouseEvent;
};

/** マウスアップ */
export type MouseUp = {
  type: "mouseUp";
  event: MouseEvent;
};

/**
 * マウスダウンストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @returns ストリーム
 */
export function createMouseDownStream(
  renderDom: HTMLElement,
): Observable<MouseDown> {
  return fromEvent<MouseEvent>(renderDom, "mousedown").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "mouseDown",
        event: v,
      };
    }),
  );
}

/**
 * マウスムーブストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @returns ストリーム
 */
export function createMouseMoveStream(
  renderDom: HTMLElement,
): Observable<MouseMove> {
  return fromEvent<MouseEvent>(renderDom, "mousemove").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "mouseMove",
        event: v,
      };
    }),
  );
}

/**
 * マウスアップストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @returns ストリーム
 */
export function createMouseUpStream(
  renderDom: HTMLElement,
): Observable<MouseUp> {
  return fromEvent<MouseEvent>(renderDom, "mouseup").pipe(
    map((v) => {
      v.preventDefault();
      return {
        type: "mouseUp",
        event: v,
      };
    }),
  );
}
