import { fromEvent, map, merge, Observable } from "rxjs";

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: "PushDOM";
  /** イベントオブジェクト */
  event: Event;
};

/**
 * HTML要素即時押下ストリーム
 * @param dom 押下判定のHTML要素
 * @return ストリーム
 */
export function domImmediatePushStream(dom: HTMLElement): Observable<PushDOM> {
  const click: Observable<PushDOM> = fromEvent<MouseEvent>(dom, "mousedown").pipe(
    map((event) => {
      return {
        type: "PushDOM",
        event,
      };
    })
  );
  const touchStart: Observable<PushDOM> = fromEvent<TouchEvent>(
    dom,
    "touchstart"
  ).pipe(
    map((event) => {
      return {
        type: "PushDOM",
        event,
      };
    })
  );
  return merge(click, touchStart);
}

/** inputイベントをラッピングしたもの */
export type InputDOM = {
  type: "ChangeDOM";
  /** イベントオブジェクト */
  event: InputEvent;
};

/**
 * inputイベントからストリームを生成する
 * @param dom ストリーム生成元のDOM
 * @returns 生成結果
 */
export function inputDOMStream(dom: HTMLInputElement): Observable<InputDOM> {
  return fromEvent<InputEvent>(dom, "input").pipe(
    map((event) => ({
      type: "ChangeDOM",
      event,
    }))
  );
}
