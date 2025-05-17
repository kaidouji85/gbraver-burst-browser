/** LastState系イベントで利用する条件判断オブジェクト */
export type LastStateCondition = {
  /** ターン数 */
  turn: number;
};

/** LastState系イベントで利用する条件判断オブジェクトを持つプロパティ */
export type LastStateConditionContainer = {
  /** LastState系イベントで利用する条件判断オブジェクト */
  lastStateCondition: LastStateCondition;
};
