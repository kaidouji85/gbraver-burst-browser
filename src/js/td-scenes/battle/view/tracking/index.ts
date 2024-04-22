import { trackingArmdozerSprites } from "./armdozer-sprite";
import { trackingGauges } from "./gauge";
import { trackingLeadLine } from "./lead-line";
import { TrackingParams } from "./tracking-params";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 * @param params パラメータ
 */
export function tracking(params: TrackingParams): void {
  trackingGauges(params);
  trackingArmdozerSprites(params);
  trackingLeadLine(params);
}
