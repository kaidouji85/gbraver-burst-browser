import Stats from "stats.js";

/**
 * @deprecated
 * パフォーマンス統計を表示する
 *
 * @param dom パフォーマンス統計をアペンドするHTML要素
 */
export function viewPerformanceStats(dom: HTMLElement): void {
  const stats = new Stats();
  stats.dom.style.position = "absolute";
  stats.dom.style.top = "env(safe-area-inset-top)";
  stats.dom.style.left = "max(env(safe-area-inset-left), 10vw)";
  stats.dom.style.right = "auto";
  dom.appendChild(stats.dom);

  const update = () => {
    requestAnimationFrame(update);
    stats.update();
  };

  requestAnimationFrame(update);
}
