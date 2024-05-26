import { BattleSceneProps } from "../props";

/**
 * バトルシミュレータ開始時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulator(props: BattleSceneProps) {
  const { exclusive } = props;
  exclusive.execute(async () => {
    // TODO 処理を追加する
  });
}
