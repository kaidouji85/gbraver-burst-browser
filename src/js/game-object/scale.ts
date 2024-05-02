import type { SafeAreaInset } from "../safe-area/safe-area-inset";

/**
 * HUDレイヤーのゲームオブジェクトが利用するスケール
 *   スケール = 現在開いている画面の高さ / iPhoneXランドスケープ時の高さ
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function hudScale(
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
): number {
  const iPhoneXLandscapeHeight = 375;
  return Math.max(
    (rendererDOM.clientHeight - safeAreaInset.bottom) / iPhoneXLandscapeHeight,
    1,
  );
}

/**
 * HUDレイヤーのユーザインタフェースで利用するスケール
 *   スケール = 現在開いている画面の高さ / バッテリーセレクタの高さに * 調整定数
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function hudUIScale(
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
): number {
  const batterySelectorOriginHeight = 234;
  return Math.max(
    ((rendererDOM.clientHeight - safeAreaInset.bottom) /
      batterySelectorOriginHeight) *
      0.45,
    1,
  );
}
