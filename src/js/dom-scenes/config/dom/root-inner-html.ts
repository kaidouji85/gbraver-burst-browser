import { GBraverBurstBrowserConfig } from "../../../game/config/browser-config";
import { battleAnimationTimeScaleOptions } from "./battle-animation-time-scale-options";
import { battleControllerTypeItems } from "./battle-controller-type-items";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";
import { soundVolumeLabel } from "./sound-volume-label";
import { webGLPixelRatioOptions } from "./webgl-pixel-ratio-options";

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
export function rootInnerHTML(
  ids: DataIDs,
  config: GBraverBurstBrowserConfig,
): string {
  const battleAnimationTimeScales = battleAnimationTimeScaleOptions(
    config.battleAnimationTimeScale,
  );
  const webGLPixelRatios = webGLPixelRatioOptions(config.webGLPixelRatio);
  const battleControllerTypes = battleControllerTypeItems(
    config.battleControllerType,
  );
  const bgmVolumeLabel = soundVolumeLabel(config.bgmVolume);
  const seVolumeLabel = soundVolumeLabel(config.seVolume);
  return rootInnerHTMLTemplate({
    ROOT_CLASS,
    ids,
    config,
    battleAnimationTimeScales,
    webGLPixelRatios,
    battleControllerTypes,
    bgmVolumeLabel,
    seVolumeLabel,
    isPerformanceStatsVisible: config.performanceStatsVisibility === "visible"
  });
}
