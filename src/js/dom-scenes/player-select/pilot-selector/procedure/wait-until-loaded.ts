import { PilotSelectorProps } from "../props";

/**
 * リソース読み込みが完了するまで待つ
 * @param props プロパティ
 * @returns リソース読み込みが完了するまで待つPromise
 */
export async function waitUntilLoaded(
  props: Readonly<PilotSelectorProps>,
): Promise<void> {
  await Promise.all(props.pilotIcons.map((icon) => icon.waitUntilLoaded()));
}
