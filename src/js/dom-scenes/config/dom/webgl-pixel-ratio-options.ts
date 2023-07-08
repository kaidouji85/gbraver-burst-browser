import {
  WebGLPixelRatio,
  WebGLPixelRatios,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘画面ピクセルレートのラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘画面のピクセルレート
 * @return 生成結果
 */
export const webGLPixelRatioOptions = (selected: WebGLPixelRatio) =>
  WebGLPixelRatios.map(
    (value) => `
    <label class="${ROOT_CLASS}__webgl-pixel-ratio-selector-label">
      <input class="${ROOT_CLASS}__webgl-pixel-ratio-selector-radio"
        name="webgl-pixel-ratio"
        type="radio"
        value="${value}" 
        ${value === selected ? "checked" : ""}
      >
      ${Number(value).toFixed(2)}
    </label>
  `,
  ).reduce((a, b) => a + b);
