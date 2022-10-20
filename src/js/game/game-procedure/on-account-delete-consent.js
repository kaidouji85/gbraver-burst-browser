// @flow
import type { GameProps } from "../game-props";

/**
 * アカウント削除同意
 *
 * @param props ゲームプロパティ
 */
export function onAccountDeleteConsent(props: $ReadOnly<GameProps>): void {
  props.domDialogs.startDeleteAccountConsent(props.resources);
}
