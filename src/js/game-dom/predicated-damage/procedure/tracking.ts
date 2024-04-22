import { DOMCoordinate } from "../../../tracking/coordinate";
import { PredicatedDamageProps } from "../props";

/**
 * トラッキングする
 * @param props コンポネントプロパティ
 * @param coordinate トラッキング先
 */
export function tracking(
  props: PredicatedDamageProps,
  coordinate: DOMCoordinate,
) {
  const { root } = props;
  root.style.top = `${coordinate.top}px`;
  root.style.left = `${coordinate.left}px`;
}
