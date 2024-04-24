import { merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../actions";
import { BattleSceneViewProps } from "../props";

/**
 * 戦闘シーンアクションを通知する
 * @param props ビュープロパティ
 * @returns 通知ストリーム
 */
export function battleActionNotifier(
  props: BattleSceneViewProps,
): Observable<BattleSceneAction> {
  const { hud, dom } = props;
  return merge(hud.battleActionNotifier(), dom.battleActionNotifier());
}
