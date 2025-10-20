import {
  BattleWindowFontSizes,
  GBraverBurstBrowserConfig,
} from "../../../game/config/browser-config";
import { battleAnimationTimeScaleOptions } from "./battle-animation-time-scale-options";
import { battleControllerTypeItems } from "./battle-controller-type-items";
import { battleWindowFontSizeItem } from "./battle-window-font-size-item";
import { ROOT_CLASS } from "./class-name";
import { playerPilotVisibilityOptions } from "./player-pilot-visibility-options";
import { playerSelectorTypeItems } from "./player-selector-types";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";
import { soundVolumeLabel } from "./sound-volume-label";
import { webGLPixelRatioOptions } from "./webgl-pixel-ratio-options";

/**
 * ルート要素のHTML要素
 *
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @returns ルート要素のHTML要素
 */
export function rootInnerHTML(config: GBraverBurstBrowserConfig): string {
  const playerSelectorTypes = playerSelectorTypeItems(
    config.playerSelectorType,
  );
  const webGLPixelRatios = webGLPixelRatioOptions(config.webGLPixelRatio);
  const battleAnimationTimeScales = battleAnimationTimeScaleOptions(
    config.battleAnimationTimeScale,
  );
  const battleControllerTypes = battleControllerTypeItems(
    config.battleControllerType,
  );
  const playerPilotVisibilities = playerPilotVisibilityOptions(
    config.playerPilotVisibility,
  );
  const battleWindowFontSizes = BattleWindowFontSizes.map((value) =>
    battleWindowFontSizeItem({
      value,
      isChecked: value === config.battleWindowFontSize,
    }),
  ).join("");
  const bgmVolumeLabel = soundVolumeLabel(config.bgmVolume);
  const seVolumeLabel = soundVolumeLabel(config.seVolume);
  return rootInnerHTMLTemplate({
    ROOT_CLASS,
    config,
    playerSelectorTypes,
    battleAnimationTimeScales,
    webGLPixelRatios,
    battleControllerTypes,
    playerPilotVisibilities,
    battleWindowFontSizes,
    bgmVolumeLabel,
    seVolumeLabel,
    checkedOfStatsVisible:
      config.performanceStatsVisibility === "visible" ? "checked" : "",
    checkedOfStatsHidden:
      config.performanceStatsVisibility === "hidden" ? "checked" : "",
  });
}
