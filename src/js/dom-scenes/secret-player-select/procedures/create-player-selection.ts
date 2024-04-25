import { PlayerSelection } from "../player-selection";
import { SecretPlayerSelectProps } from "../props";

/**
 * プレイヤーの選択情報を作成する
 * @param props 画面プロパティ
 * @returns 生成結果、未選択の場合はnull
 */
export const createPlayerSelection = (
  props: Readonly<SecretPlayerSelectProps>,
): PlayerSelection | null =>
  props.armdozerSelection.type === "ArmdozerSelectionComplete" &&
  props.pilotSelection.type === "PilotSelectionComplete"
    ? {
        armdozerId: props.armdozerSelection.armdozerId,
        pilotId: props.pilotSelection.pilotId,
      }
    : null;
