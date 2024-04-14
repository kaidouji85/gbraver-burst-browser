import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";

/**
 * ネット対戦が押された時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onNetBattlePush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.se.play(props.pushButton);
    await pop(props.netBattle);
    props.pushNetBattle.next();
  });
}
