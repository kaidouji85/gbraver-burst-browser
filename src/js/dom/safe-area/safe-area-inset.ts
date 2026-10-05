/**
 * セーフエリア関連モジュール
 * 本モジュールは以下のCSSカスタムプロパティに依存している
 *
 * --safe-area-top
 * --safe-area-bottom
 * --safe-area-right
 * --safe-area-left
 */

/** CSSカスタムプロパティ セーフエリアトップ */
export const SAFE_AREA_TOP = "--safe-area-top";

/** CSSカスタムプロパティ セーフエリアボトム */
export const SAFE_AREA_BOTTOM = "--safe-area-bottom";

/** CSSカスタムプロパティ セーフエリアライト */
export const SAFE_AREA_RIGHT = "--safe-area-right";

/** CSSカスタムプロパティ セーフエリアレフト */
export const SAFE_AREA_LEFT = "--safe-area-left";

/** セーフエリアインセット */
export type SafeAreaInset = {
  top: number;
  bottom: number;
  right: number;
  left: number;
};

/** 空のセーフエリアインセット */
export const EMPTY_SAFE_AREA_INSET: SafeAreaInset = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

/**
 * DocumentRootからセーフエリアインセットを生成する
 *
 * @returns 生成結果
 */
export function createSafeAreaInset(): SafeAreaInset {
  if (!document.documentElement) {
    return EMPTY_SAFE_AREA_INSET;
  }

  const style = getComputedStyle(document.documentElement);

  if (!style) {
    return EMPTY_SAFE_AREA_INSET;
  }

  const top = style.getPropertyValue(SAFE_AREA_TOP);
  const bottom = style.getPropertyValue(SAFE_AREA_BOTTOM);
  const right = style.getPropertyValue(SAFE_AREA_RIGHT);
  const left = style.getPropertyValue(SAFE_AREA_LEFT);
  return {
    top: getSize(top),
    bottom: getSize(bottom),
    right: getSize(right),
    left: getSize(left),
  };
}

/**
 * セーフエリアインセットプロパティの値を数字型にパースする
 * パース前の文字列として、以下フォーマットのものを想定している
 * 以下フォーマット以外を指定した場合は0を返す
 * 10000px
 * 10002.34px
 *
 *
 * @param origin パース前
 * @returns パース結果
 */
export function getSize(origin: string): number {
  const reg = /(?<size>[+-]?([0-9]+(\.[0-9]*)?|\.[0-9]+)([eE][+-]?[0-9]+)?)px/;
  const result = origin.match(reg);

  if (!result || !result.groups || !("size" in result.groups)) {
    return 0;
  }

  const size = result.groups.size;
  return Number(size);
}
