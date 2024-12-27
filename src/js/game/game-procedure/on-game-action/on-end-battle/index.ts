import { parseBrowserConfig } from "../../../config/parser/browser-config";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { executePostEpisode } from "./execute-post-episode";
import { executePostNetBattle } from "./execute-post-net-battle";
import { executePostNPCBattle } from "./execute-post-npc-battle";

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
        return executePostNPCBattle({ ...props, inProgress }, action);
      case "CasualMatch":
      case "PrivateMatchHost":
      case "PrivateMatchGuest":
        return executePostNetBattle({ ...props, inProgress });
      case "Story":
        return executePostEpisode({ ...props, inProgress }, action);
      default:
        return inProgress;
    }
  })();
}
