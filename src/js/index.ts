import "../css/first-view.css";

window.addEventListener("load", () => {
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
});

window.addEventListener("load", async () => {
  const { main } = await import("./main");
  main();
});
