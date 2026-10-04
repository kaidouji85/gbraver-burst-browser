import { OK_BUTTON } from "../dom/class-name";
import { SecretPlayerSelectProps } from "../props";

/**
 * 決定ボタンを押せるかどうか判定する
 * @param props プロパティ
 * @returns 判定結果、押せる場合true
 */
export const canPushOkButton = (props: Readonly<SecretPlayerSelectProps>) =>
  props.armdozerSelection.type === "ArmdozerSelectionComplete" &&
  props.pilotSelection.type === "PilotSelectionComplete";

/**
 * 決定ボタンを押せるかどうか判定し、押せる場合は決定ボタンを有効にする
 * @param props プロパティ
 */
export function enableOKButtonIfNeeded(
  props: Readonly<SecretPlayerSelectProps>,
): void {
  if (canPushOkButton(props)) {
    props.okButton.className = OK_BUTTON;
    props.okButton.disabled = false;
  }
}
