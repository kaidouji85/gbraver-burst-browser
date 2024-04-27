import { PlayerSelectProps } from "../props";

/**
 * パイロットセレクタの戻るボタンを押した時の処理
 * @param props シーンプロパティ
 * @returns 処置が完了したら発火するPromise
 */
export async function onPilotSelectorPrev(
  props: Readonly<PlayerSelectProps>,
): Promise<void> {
  await props.pilotBustShot.exit();
  props.pilotBustShot.hidden();
  props.pilotSelector.hidden();
  props.armdozerSelector.show();
}
