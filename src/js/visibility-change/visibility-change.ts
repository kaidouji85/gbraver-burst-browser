import {fromEvent, map, Observable} from "rxjs";

/** 視認性変更イベント */
export type VisibilityChange = {
  type: "VisibilityChange";
  /** イベント */
  event: Event;
};

/**
 * VisibilityChangeイベントのストリームを生成する
 * @return VisibilityChangeイベントストリーム
 */
export function createVisibilityChange(): Observable<VisibilityChange> {
  return fromEvent(document, "visibilitychange").pipe(
    map(event => ({
      type: "VisibilityChange",
      event,
    }))
  );
}