import { PrivateMatchEntry } from "../game-actions";
import { GameProps } from "../game-props";

/**
 * ゲストがプライベートマッチにエントリする
 * @param props ゲームプロパティ 
 * @param action アクション 
 */
export async function onPrivateMatchEntry(
  props: Readonly<GameProps>,
  action: PrivateMatchEntry
): Promise<void> {
  // NOP
}
