import { Observable } from "rxjs";

import { GameObjectAction } from "../action/game-object-action";
import { LeadLine } from "./lead-line";
import { LeadLineView } from "./view/lead-line-view";

/** 色 */
const COLOR = 0xf5f5f5;
/** 不透明度 */
const OPACITY = 0.8;

/**
 * バッテリーセレクタの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 引き出し線
 */
export function batterySelectorLeadLine(
  gameObjectAction: Observable<GameObjectAction>,
): LeadLine {
  const view = new LeadLineView(COLOR, 90, OPACITY);
  return new LeadLine(view, gameObjectAction);
}

/**
 * バーストボタンの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 引き出し線
 */
export function burstButtonLeadLine(
  gameObjectAction: Observable<GameObjectAction>,
): LeadLine {
  const view = new LeadLineView(COLOR, 60, OPACITY);
  return new LeadLine(view, gameObjectAction);
}

/**
 * パイロットボタンの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 引き出し線
 */
export function pilotButtonLeadLine(
  gameObjectAction: Observable<GameObjectAction>,
): LeadLine {
  const view = new LeadLineView(COLOR, 60, OPACITY);
  return new LeadLine(view, gameObjectAction);
}
