import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";

/**
 * ログインが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onLoginPush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushButton.sound.play();
    await pop(props.login);
    props.pushLogin.next();
  });
}
