import { parseBrowserConfig } from "../../../config/parser/browser-config";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { endCasualMatchGuest } from "./end-casual-match";
import { endEpisode } from "./end-episode";
import { endNetBattle } from "./end-net-battle";
import { endNPCBattle } from "./end-npc-battle";
import { endPrivateMatchGuest } from "./end-private-match-guest";
import { endPrivateMatchHost } from "./end-private-match-host";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: Readonly<EndBattle>;
};

/**
 * 戦闘終了時の処理
 * 本関数にはprops.inProgressを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndBattle(options: Options): Promise<void> {
  const { props, action } = options;
  const config = await props.config.load();
  await props.config.save(
    parseBrowserConfig({
      ...config,
      battleAnimationTimeScale: action.animationTimeScale,
    }),
  );

  const inProgress = props.inProgress;
  props.inProgress = await (() => {
    switch (inProgress.type) {
      case "NPCBattle":
        return endNPCBattle({ ...props, inProgress }, action);
      case "CasualMatch":
        return endCasualMatchGuest({ ...props, inProgress }, action);
      case "PrivateMatchHost":
        return endPrivateMatchHost({ ...props, inProgress }, action);
      case "PrivateMatchGuest":
        return endPrivateMatchGuest({ ...props, inProgress }, action);
      case "OfflineLANCasualMatch":
      case "PasswordMatchHost":
      case "PasswordMatchGuest":
        return endNetBattle({ ...props, inProgress });
      case "Story":
        return endEpisode({ ...props, inProgress }, action);
      default:
        return inProgress;
    }
  })();
}
