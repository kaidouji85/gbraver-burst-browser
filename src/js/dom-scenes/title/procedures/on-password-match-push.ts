import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { TitleProps } from "../props";

/**
 * あいことば対戦が押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onPasswordMatchPush = (
  props: Readonly<TitleProps>,
  action: Readonly<PushDOM>,
) => {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    props.se.play(props.pushButton);
    await pop(props.passwordMatch);
    props.pushPasswordMatch.next();
  });
};
