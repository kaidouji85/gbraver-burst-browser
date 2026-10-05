import { PilotId } from "gbraver-burst-core";

import { BLOCK } from "../dom/class-name";
import { PilotSelectorProps } from "../props";

/**
 * 本コンポネントを表示する
 * @param props プロパティ
 * @param pilotId 選択するパイロットID
 */
export function show(props: PilotSelectorProps, pilotId: PilotId) {
  const selected = props.pilotIcons.find((icon) => icon.pilotId === pilotId);
  if (!selected) {
    return;
  }

  props.root.className = BLOCK;
  props.pilotId = pilotId;
  selected.selected(true);
  props.pilotStatus.switch(pilotId);
  props.pilotIcons
    .filter((icon) => icon.pilotId !== pilotId)
    .forEach((icon) => {
      icon.selected(false);
    });
}
