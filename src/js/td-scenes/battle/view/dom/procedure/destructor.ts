import { DOMLayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props レイヤープロパティ
 */
export function destructor(props: DOMLayerProps): void {
  props.miniController.destructor();
}
