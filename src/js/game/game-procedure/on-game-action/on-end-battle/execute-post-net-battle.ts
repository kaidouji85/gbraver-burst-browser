import { PostNetworkBattleButtons } from "../../../../dom-floaters/post-battle/post-battle-buttons";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { CasualMatch } from "../../../in-progress/casual-match";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";

/** ネット対戦のサブフロー */
type PostNetworkBattle = CasualMatch | PrivateMatchHost | PrivateMatchGuest;

/**
 * ネット対戦後処理を実行する
 * @param props ゲームプロパティ
 * @returns inProgress更新結果
 */
export async function executePostNetBattle(
  props: Readonly<GameProps & { inProgress: PostNetworkBattle }>,
): Promise<InProgress> {
  const { inProgress } = props;
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
  await props.postBattle.show({
    ...props,
    buttons: PostNetworkBattleButtons,
  });
  return inProgress;
}
