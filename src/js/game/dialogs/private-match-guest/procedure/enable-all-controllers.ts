import { PrivateMatchGuestDialogProps } from "../props";

/**
 * すべての入力要素を操作可能にする
 * @param props プロパティ
 */
export function enableAllControllers(
  props: PrivateMatchGuestDialogProps,
): void {
  props.roomID.disabled = false;
}
