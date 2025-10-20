import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { CasualMatch } from "../../../in-progress/casual-match";
import { OfflineLANCasualMatch } from "../../../in-progress/offline-lan-casual-match";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { PostNetworkBattleButtons } from "../../../post-battle-buttons";
import { disconnectConnection } from "../../helpers/disconnect-connection";

/** ネット対戦のフロー */
type PostNetworkBattle =
  | CasualMatch
  | PrivateMatchHost
  | PrivateMatchGuest
  | OfflineLANCasualMatch;

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
  await disconnectConnection(props);
  await props.postBattle.show({
    ...props,
    buttons: PostNetworkBattleButtons,
  });
  return inProgress;
}
