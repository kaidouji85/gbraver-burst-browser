import type { PlayerId } from "gbraver-burst-core";

import { HudLayer } from "../hud";
import { ThreeDimensionLayer } from "../td";
import { trackingArmdozerSprites } from "./armdozer-sprite";
import { trackingGauges } from "./gauge";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param activePlayerId このゲームを操作しているプレイヤーID
 * @param rendererDOM レンダリング対象のDOM
 */
export function tracking(
  td: ThreeDimensionLayer,
  hud: HudLayer,
  activePlayerId: PlayerId,
  rendererDOM: HTMLElement
): void {
  trackingGauges(td, hud, activePlayerId, rendererDOM);
  trackingArmdozerSprites(td, hud, rendererDOM);
}
