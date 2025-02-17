import { ForceEndBattle } from "../../../game-actions/force-end-battle";
import { GameProps } from "../../../game-props";
import { forceEndBattle } from "./force-end-battle";
import { forceEndNetBattle } from "./force-end-net-battle";
import { forceEndStoryBattle } from "./force-end-story-battle";

/** onForceEndBattleオプション */
type ForceEndBattleOptions = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  readonly action: ForceEndBattle;
};

/**
 * プレイヤーによるバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onForceEndBattle(options: ForceEndBattleOptions) {
  const { props } = options;
  const { inProgress } = props;
  switch (inProgress.type) {
    case "CasualMatch":
    case "PrivateMatchHost":
    case "PrivateMatchGuest":
      await forceEndNetBattle({ ...props, inProgress });
      props.inProgress = { type: "None" };
      break;
    case "Story":
      await forceEndStoryBattle({ ...props, inProgress });
      props.inProgress = { type: "Story", story: { type: "EpisodeSelect" } };
      break;
    default:
      await forceEndBattle(props);
      props.inProgress = { type: "None" };
      break;
  }
}
