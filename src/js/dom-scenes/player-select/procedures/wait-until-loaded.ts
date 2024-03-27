import { PlayerSelectProps } from "../props";

/**
 * リソース読み込みが完了するまで待つ
 * @param props シーンプロパティ
 * @return 読み込み完了したら発火するPromise
 */
export async function waitUntilLoaded(
  props: Readonly<PlayerSelectProps>,
): Promise<void> {
  await Promise.all([
    props.armdozerBustShot.waitUntilLoaded(),
    props.armdozerSelector.waitUntilLoaded(),
    props.pilotBustShot.waitUntilLoaded(),
    props.pilotSelector.waitUntilLoaded(),
  ]);
}
