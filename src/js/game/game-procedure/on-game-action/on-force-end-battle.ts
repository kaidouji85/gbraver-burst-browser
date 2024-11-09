import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { playTitleBGM } from "../play-title-bgm";
import { startTitle } from "../start-title";

/**
 * NPCバトルの強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 */
async function forceEndNPCBattle(props: GameProps) {
  props.inProgress = { type: "None" };
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      props.tdSceneBinder.dispose();
      await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
}

/**
 * プレイヤーによるバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 */
async function onForceEndBattle(props: GameProps) {
  await forceEndNPCBattle(props); // TODO inProgressに応じて個別処理をする
}

/** アクションタイプ */
const actionType = "ForceEndBattle";

/** プレイヤーによるバトル強制終了のイベントリスナーコンテナ */
export const forceEndBattleContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onForceEndBattle(props);
    }
  },
};
