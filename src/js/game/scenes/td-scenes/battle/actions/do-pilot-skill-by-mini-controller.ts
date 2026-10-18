/** ミニコントローラーのパイロットボタンが押された */
export type DoPilotSkillByMiniController = {
  type: "doPilotSkillByMiniController";
  /** パイロットスキルボタン押下時のDOMイベント */
  event: Event;
};
