import { Observable } from "rxjs";

import { GameObjectAction } from "../action/game-object-action";
import { LeadLine } from "./lead-line";
import { LeadLineView } from "./view/lead-line-view";

/**
 * 戦闘画面ボタンの引き出し線を生成する
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 引き出し線
 */
export function battleButtonLeadLine(
  gameObjectAction: Observable<GameObjectAction>
): LeadLine {
  const view = new LeadLineView(0xf5f5f5, 3);
  return new LeadLine(view, gameObjectAction);
}
