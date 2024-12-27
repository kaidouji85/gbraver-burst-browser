import { PostNetworkBattleButtons } from "../../../dom-floaters/post-battle/post-battle-buttons";
import { GameProps } from "../../../game-props";

/**
 * 条件を満たしたら、ネット対戦後処理を実行する
 * @param props ゲームプロパティ
 * @returns ネット対戦後処理を実行したか否か、trueで実行した
 */
export async function executePostNetBattleIfNeeded(
  props: Readonly<GameProps>,
): Promise<boolean> {
  const { inProgress } = props;
  const isPostNetBattle =
    inProgress.type === "CasualMatch" ||
    inProgress.type === "PrivateMatchHost" ||
    inProgress.type === "PrivateMatchGuest";
  if (!isPostNetBattle) {
    return false;
  }

  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
  await props.domFloaters.showPostBattle({
    ...props,
    buttons: PostNetworkBattleButtons,
  });
  return true;
}
