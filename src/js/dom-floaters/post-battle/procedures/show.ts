import { PostBattleFloaterProps } from "../props";
import { ShowParams } from "../show-params";
import { bottomUp } from "./bottom-up";
import { createActionButtons } from "./create-action-buttons";

/**
 * アニメーション付きでフローターを表示する
 * @param props プロパティ
 * @param params 表示パラメータ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function show(
  props: PostBattleFloaterProps,
  params: ShowParams,
): Promise<void> {
  await props.exclusive.execute(async () => {
    const actionButtons = createActionButtons(props, params);
    actionButtons.forEach((v) => {
      props.root.appendChild(v.button);
    });
    props.unsubscribers = actionButtons.map((v) => v.unsubscriber);
    await bottomUp(props);
  });
}
