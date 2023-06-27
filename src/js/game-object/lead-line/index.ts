import { LeadLine } from "./lead-line";

/**
 * 戦闘画面ボタンの引き出し線を生成する
 * @return 引き出し線
 */
export function battleButtonLeadLine(): LeadLine {
  return new LeadLine(0xf5f5f5, 3);
}
