import { play } from "../../../bgm/bgm-operators";
import type { BattleSceneProps } from "../props";
import { playStateHistory } from "./play-state-history";

/**
 * 戦闘シーンを開始する
 *
 * @param props 戦闘シーンプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function start(props: Readonly<BattleSceneProps>): Promise<void> {
  return props.exclusive.execute(async (): Promise<void> => {
    props.bgm.do(play(props.sounds.bgm));
    props.view.dom.hamburgerMenu.show();
    await playStateHistory(props, props.stateHistory);
  });
}
