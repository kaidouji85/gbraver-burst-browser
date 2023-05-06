import {
  WebGLPixelRatio,
  WebGLPixelRatios,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";

/**
 * 戦闘画面のピクセルレートのoption要素HTMLを生成する
 * @param selected 選択中の戦闘画面のピクセルレート
 * @return 生成結果
 */
export const webGLPixelRatioOptions = (selected: WebGLPixelRatio) =>
  WebGLPixelRatios.map(
    (value) => `
    <option class="${ROOT_CLASS}__webgl-pixel-ratio-selector-option" 
      value="${value}" 
      ${value === selected ? "selected" : ""}
    >
      ${Number(value).toFixed(2)}
    </option>
  `
  ).reduce((a, b) => a + b);
