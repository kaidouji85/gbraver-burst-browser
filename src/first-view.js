window.addEventListener("load", () => {
  // 時間経過で初期化が遅い場合のメッセージを表示
  setTimeout(() => {
    const initializeIsSlow =
      document.getElementById("first-view__initialize-is-slow") ||
      document.createElement("div");
    initializeIsSlow.className = "first-view__initialize-is-slow";

    const firstViewInitializing =
      document.getElementById("first-view__initializing") ||
      document.createElement("div");
    firstViewInitializing.className = "first-view__initializing--invisible";
  }, 15000);

  // iPad、iPhoneでダブルタップした場合にズームインしないようにする
  if (document.body) {
    document.body.addEventListener("dblclick", (e) => {
      e.preventDefault();
    });
  }
});
