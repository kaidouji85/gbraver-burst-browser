import { createActionButton } from "../action-button/create-action-button";
import { PostBattleFloaterProps } from "../props";
import { ShowParams } from "../show-params";
import { bottomUp } from "./bottom-up";

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
  const actionButtons = params.buttons.map((buttonConfig) =>
    createActionButton({ ...params, props, buttonConfig }),
  );
  actionButtons.forEach((v) => {
    props.root.appendChild(v.button);
  });
  props.unsubscribers = actionButtons.map((v) => v.unsubscriber);

  props.abortController = new AbortController();
  await bottomUp(props);
}
