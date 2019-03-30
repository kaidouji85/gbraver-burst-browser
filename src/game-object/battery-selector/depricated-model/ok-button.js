// @flow

/** OKボタンのモデル */
export type OkButtonModel = {
  /** ボタンの押し込み度、0〜1で1で最大押し込み */
  depth: number,
  /** ボタンのラベル */
  label: OkButtonLabel
};

/** OKボタンのラベル */
export type OkButtonLabel = 'Attack' | 'Defense';