import {
  WebGLPixelRatio,
  WebGLPixelRatios,
} from "../../../game/config/browser-config";
import { ROOT_CLASS } from "./class-name";
import webglPixelRatioTemplate from "./webgl-pixel-ratio.hbs";

/**
 * 戦闘画面ピクセルレートのラジオボタン要素HTMLを生成する
 * @param selected 選択中の戦闘画面のピクセルレート
 * @returns 生成結果
 */
export const webGLPixelRatioOptions = (selected: WebGLPixelRatio) =>
  WebGLPixelRatios.map((value) => {
    const checked = value === selected ? "checked" : "";
    const pixelRatio = Number(value).toFixed(2);
    return webglPixelRatioTemplate({
      ROOT_CLASS,
      value,
      checked,
      pixelRatio,
    });
  }).reduce((a, b) => a + b);
