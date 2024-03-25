import { ArmdozerSelectorProps } from "../props";

/**
 * アームドーザアイコンがロードされるまで待つ
 * @param props プロパティ
 * @return ロード完了したら発火するPromise
 */
export async function waitUntilLoaded(
  props: Readonly<ArmdozerSelectorProps>,
): Promise<void> {
  await Promise.all(props.armdozerIcons.map((icon) => icon.waitUntilLoaded()));
}
