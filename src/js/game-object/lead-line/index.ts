import { Observable } from "rxjs";

import { GameObjectAction } from "../action/game-object-action";
import { LeadLine } from "./lead-line";
import { LeadLineView } from "./view/lead-line-view";

/**
 * バッテリーセレクタの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 引き出し線
 */
export function batterySelectorLeadLine(
  gameObjectAction: Observable<GameObjectAction>
): LeadLine {
  const view = new LeadLineView(0xdcdcdc, 90, 0.8);
  return new LeadLine(view, gameObjectAction);
}

/**
 * バーストボタンの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 引き出し線
 */
export function burstButtonLeadLine(
  gameObjectAction: Observable<GameObjectAction>
): LeadLine {
  const view = new LeadLineView(0xdcdcdc, 45, 0.8);
  return new LeadLine(view, gameObjectAction);
}

/**
 * パイロットボタンの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 引き出し線
 */
export function pilotButtonLeadLine(
  gameObjectAction: Observable<GameObjectAction>
): LeadLine {
  const view = new LeadLineView(0xdcdcdc, 45, 0.8);
  return new LeadLine(view, gameObjectAction);
}