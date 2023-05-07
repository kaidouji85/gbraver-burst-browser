import { GbraverBurstBrowserConfig } from "../../../game/config/browser-config";
import { battleAnimationTimeScaleOptions } from "./battle-animation-time-scale-options";
import { battleControllerTypeOptions } from "./battle-controller-type-options";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";
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
  config: GbraverBurstBrowserConfig
): string {
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__battle-animation-time-scale">
        <div class="${ROOT_CLASS}__battle-animation-time-scale-caption">バトル アニメ速度</div>
        <div class="${ROOT_CLASS}__config-separation"></div>
        <div class="${ROOT_CLASS}__battle-animation-time-scale-description">
          バトル中のアニメーション速度を変更します。
        </div>
        <select class="${ROOT_CLASS}__battle-animation-time-scale-selector"
          data-id="${ids.battleAnimationTimeScaleSelector}"
         >
          ${battleAnimationTimeScaleOptions(config.battleAnimationTimeScale)}
        </select>
      </div>
      <div class="${ROOT_CLASS}__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__webgl-pixel-ratio-caption">バトル ピクセルレート</div>
        <div class="${ROOT_CLASS}__config-separation"></div>
        <div class="${ROOT_CLASS}__webgl-pixel-ratio-description">
          バトル中の画面解像度を変更します。
          値が大きくなるほど画面が綺麗になりますが、負荷が高くなります。
        </div>
        <select class="${ROOT_CLASS}__webgl-pixel-ratio-selector"
          data-id="${ids.webGLPixelRatioSelector}"
        >
          ${webGLPixelRatioOptions(config.webGLPixelRatio)}
        </select>
      </div>
      <div class="${ROOT_CLASS}__battle-controller-type">
        <div class="${ROOT_CLASS}__battle-controller-type-caption">バトル コントローラー</div>
        <div class="${ROOT_CLASS}__config-separation"></div>
        <div class="${ROOT_CLASS}__battle-controller-type-selector"
          data-id="${ids.battleControllerTypeSelector}"
        >
          ${battleControllerTypeOptions(config.battleControllerType)}
        </div>
      </div>
      <div class="${ROOT_CLASS}__bgm-volume">
        <div class="${ROOT_CLASS}__bgm-volume-caption">音量 BGM</div>
        <div class="${ROOT_CLASS}__config-separation"></div>
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
        <div class="${ROOT_CLASS}__se-volume-caption">音量 SE</div>
        <div class="${ROOT_CLASS}__config-separation"></div>
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
  `;
}
