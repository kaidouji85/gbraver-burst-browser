import { play } from "../../../bgm/bgm-operators";
import { BattleSceneProps } from "../props";
import { playUpdatedStateHistory } from "./play-updated-state-history";

/**
 * 戦闘シーンを開始する
 *
 * @param props 戦闘シーンプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function start(props: Readonly<BattleSceneProps>): Promise<void> {
  return props.exclusive.execute(async (): Promise<void> => {
    props.view.dom.hamburgerMenu.show();
    props.bgm.do(play(props.sounds.bgm));
    await playUpdatedStateHistory(props, props.stateHistory);
  });
}
