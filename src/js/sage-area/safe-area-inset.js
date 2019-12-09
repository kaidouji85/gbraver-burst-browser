// @flow

export const SAFE_AREA_TOP = '--safe-area-top';
export const SAFE_AREA_BOTTOM = '--safe-area-bottom';
export const SAFE_AREA_RIGHT = '--safe-area-right';
export const SAFE_AREA_LEFT = '--safe-area-left';

/** セーフエリアインセット */
export type SafeAreaInset = {
  top: number;
  bottom: number;
  right: number;
  left: number;
};

/** 空のセーフエリアインセット */
export const EMPTY_SAFE_AREA_INSET = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

/**
 * DocumentRootからセーフエリアインセットを生成する
 *
 * @return 生成結果
 */
export function createSafeAreaInset() {
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
    top: !isNaN(top)
      ? Number(top)
      : 0,
    bottom : isNaN(bottom)
      ? Number(bottom)
      : 0,
    right: isNaN(right)
      ? Number(right)
      : 0,
    left: isNaN(left)
      ? Number(left)
      : 0
  };
}