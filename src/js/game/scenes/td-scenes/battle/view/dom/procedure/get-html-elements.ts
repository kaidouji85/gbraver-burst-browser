import { DOMLayerProps } from "../props";

/**
 * シーンに追加するHTML要素群を取得する
 * @param props レイヤープロパティ
 * @returns シーンに追加するHTML要素群
 */
export function getHTMLElements(props: DOMLayerProps): HTMLElement[] {
  return [
    props.rightMessageWindow.getRootHTMLElement(),
    props.leftMessageWindow.getRootHTMLElement(),
    props.nearBatterySelectorMessageWindow.getRootHTMLElement(),
    props.nearBurstButtonMessageWindow.getRootHTMLElement(),
    props.nearPilotButtonMessageWindow.getRootHTMLElement(),
    props.nearPlayerBattleSimulatorButtonMessageWindow.getRootHTMLElement(),
    props.playerShoutMessageWindow.getRootHTMLElement(),
    props.enemyShoutMessageWindow.getRootHTMLElement(),
    props.hamburgerMenu.getRootHTMLElement(),
    props.miniController.getRootHTMLElement(),
  ];
}
