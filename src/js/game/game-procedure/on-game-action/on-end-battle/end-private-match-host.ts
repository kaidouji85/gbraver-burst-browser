import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";

/**
 * ネット対戦を終了する
 * 本関数はすべてのネットワークコンテキストに対応している
 * @param props ゲームプロパティ
 * @returns inProgress更新結果
 */
export async function endPrivateMatchHost(
  props: Readonly<GameProps & { inProgress: PrivateMatchHost }>,
): Promise<InProgress> {
  const { inProgress } = props;
  props.suddenlyBattleEnd.unbind();
  return { ...inProgress, privateMatchHost: { type: "Rematch" } };
}
