import { PrivateMatchGuestDialogProps } from "../props";

/**
 * すべての入力要素を操作不可能にする
 * @param props プロパティ
 */
export function disableAllControllers(
  props: PrivateMatchGuestDialogProps,
): void {
  props.roomID.disabled = true;
}
