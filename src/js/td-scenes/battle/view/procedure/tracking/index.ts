import { armdozerCutInTracking } from "./armdozer-cutin-tracking";
import { gaugeTracking } from "./gauge-tracking";
import { leadLineTracking } from "./lead-line-tracking";
import { predicatedDamageTracking } from "./predicated-damage-tracking";
import { TrackingParams } from "./tracking-params";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 * @param params パラメータ
 */
export function tracking(params: TrackingParams): void {
  gaugeTracking(params);
  armdozerCutInTracking(params);
  leadLineTracking(params);
  predicatedDamageTracking(params);
}
