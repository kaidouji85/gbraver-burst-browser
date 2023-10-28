import { PilotSelectorProps } from "../props";

/**
 * リソース読み込みが完了するまで待つ
 * @param props プロパティ
 * @return リソース読み込みが完了するまで待つPromise
 */
export async function waitUntilLoaded(
  props: Readonly<PilotSelectorProps>,
): Promise<void> {
  await Promise.all(props.pilotIcons.map((v) => v.icon.waitUntilLoaded()));
}
