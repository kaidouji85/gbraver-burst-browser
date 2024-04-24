import { trackingArmdozerSprites } from "./armdozer-sprite";
import { gaugeTracking } from "./gauge-tracking";
import { trackingLeadLine } from "./lead-line";
import { TrackingParams } from "./tracking-params";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 * @param params パラメータ
 */
export function tracking(params: TrackingParams): void {
  gaugeTracking(params);
  trackingArmdozerSprites(params);
  trackingLeadLine(params);
}
