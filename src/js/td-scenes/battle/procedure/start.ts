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
    // ゲームスタート時は
    //   - 更新前のステートヒストリー   =  0レコード
    //   - 更新分のステートヒストリー = 1レコード以上
    // なので、「更新後のステートヒストリー」と「更新分のステートヒストリー」が一致する
    await playUpdatedStateHistory(props, props.stateHistory);
  });
}
