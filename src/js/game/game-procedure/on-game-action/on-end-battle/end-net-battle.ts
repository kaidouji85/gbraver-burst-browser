import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { OfflineLANCasualMatch } from "../../../in-progress/offline-lan-casual-match";
import { PasswordMatchGuest } from "../../../in-progress/password-match-guest";
import { PasswordMatchHost } from "../../../in-progress/password-match-host";
import { PostNetworkBattleButtons } from "../../../post-battle-buttons";

/**
 * ネット対戦を終了する
 * @param props ゲームプロパティ
 * @returns inProgress更新結果
 */
export async function endNetBattle(
  props: Readonly<
    GameProps & {
      inProgress:
        OfflineLANCasualMatch | PasswordMatchHost | PasswordMatchGuest;
    }
  >,
): Promise<InProgress> {
  const { inProgress } = props;
  props.suddenlyBattleEnd.unbind();
  await props.postBattle.show({
    ...props,
    buttons: PostNetworkBattleButtons,
  });
  return inProgress;
}
