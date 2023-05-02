import type {
  GbraverBurstBrowserConfig,
} from "../../../game/config/browser-config";
import { BattleAnimationTimeScale, BattleAnimationTimeScales } from "../../../game/config/schema/battle-animation-time-scale";
import { WebGLPixelRatio, WebGLPixelRatios } from "../../../game/config/schema/web-gl-pixel-ratio";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";
import { soundVolumeLabel } from "./sound-volume-label";

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
export function rootInnerHTML(
  ids: DataIDs,
  config: GbraverBurstBrowserConfig
): string {
  const battleAnimationTimeScaleOption = (value: BattleAnimationTimeScale) => {
    const selected =
      value === config.battleAnimationTimeScale ? "selected" : "";
    return `
    <option class="${ROOT_CLASS}__battle-animation-time-scale-option"
      value="${value}"
      ${selected}
    >
      ${Math.floor(1 / value)}倍
    </option>`;
  };
  const battleAnimationTimeScaleOptions = BattleAnimationTimeScales.map((v) =>
    battleAnimationTimeScaleOption(v)
  ).reduce((a, b) => a + b);
  const webGLPixelRatioOption = (value: WebGLPixelRatio) => `
    <option class="${ROOT_CLASS}__webgl-pixel-ratio-selector-option" 
      value="${value}" ${value === config.webGLPixelRatio ? "selected" : ""}>
      ${Number(value).toFixed(2)}
    </option>`;
  const webGLPixelRatioOptions = WebGLPixelRatios.map((v) =>
    webGLPixelRatioOption(v)
  ).reduce((a, b) => a + b);
  return `
    <div class="${ROOT_CLASS}__content">
      <div class="${ROOT_CLASS}__title">設定</div>
      <div class="${ROOT_CLASS}__configs">
        <div class="${ROOT_CLASS}__battle-animation-time-scale">
          <div class="${ROOT_CLASS}__battle-animation-time-scale-caption">戦闘アニメ再生速度</div>
          <select class="${ROOT_CLASS}__battle-animation-time-scale-selector"
            data-id="${ids.battleAnimationTimeScaleSelector}"
           >
            ${battleAnimationTimeScaleOptions}
          </select>
        </div>
        <div class="${ROOT_CLASS}__webgl-pixel-ratio">
          <div class="${ROOT_CLASS}__webgl-pixel-ratio-caption">戦闘画面のピクセルレート</div>
          <select class="${ROOT_CLASS}__webgl-pixel-ratio-selector"
            data-id="${ids.webGLPixelRatioSelector}"
          >
            ${webGLPixelRatioOptions}
          </select>
        </div>
        <div class="${ROOT_CLASS}__bgm-volume">
          <div class="${ROOT_CLASS}__bgm-volume-caption">BGM音量</div>
          <input class="${ROOT_CLASS}__bgm-volume-selector" 
            type="range" min="0" max="1" step="0.1" 
            value="${config.bgmVolume}" 
            data-id="${ids.bgmVolumeSelector}"
          >
          <div class="${ROOT_CLASS}__bgm-volume-value"
            data-id="${ids.bgmVolumeValue}"
          >
          ${soundVolumeLabel(config.bgmVolume)}</div>
        </div>
        <div class="${ROOT_CLASS}__se-volume">
          <div class="${ROOT_CLASS}__se-volume-caption">SE音量</div>
          <input class="${ROOT_CLASS}__se-volume-selector" type="range" min="0" max="1" step="0.1"
            value="${config.seVolume}" 
            data-id="${ids.seVolumeSelector}"
          >
          <div class="${ROOT_CLASS}__se-volume-value"
            data-id="${ids.seVolumeValue}"
          >
          ${soundVolumeLabel(config.seVolume)}</div>
        </div>
      </div>
      <div class="${ROOT_CLASS}__footer">
        <button class="${ROOT_CLASS}__prev" data-id="${ids.prev}">戻る</button>
        <button class="${ROOT_CLASS}__config-change"
          data-id="${ids.configChange}"
        >
          この設定にする
        </button>
      </div>
    </div>
  `;
}
