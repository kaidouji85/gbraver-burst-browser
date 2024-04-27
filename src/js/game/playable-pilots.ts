import { PilotId, PilotIds } from "gbraver-burst-core";

import { GameProps } from "./game-props";

/** プレイアブルなパイロット */
export const PlayablePilots: PilotId[] = [
  PilotIds.SHINYA,
  PilotIds.TSUBASA,
  PilotIds.GAI,
  PilotIds.RAITO,
  PilotIds.YUUYA,
];

/** 開発中も含めたプレイアブルなパイロット */
export const DevelopingPlayablePilots: PilotId[] = [...PlayablePilots];

/**
 * プレイアブルパイロットを取得するヘルパー関数
 * @param props ゲームプロパティ
 * @returns 取得結果
 */
export function getPlayablePilots(props: Readonly<GameProps>): PilotId[] {
  return props.canPlayDevelopingPilot
    ? DevelopingPlayablePilots
    : PlayablePilots;
}
