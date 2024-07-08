window.addEventListener("load", async () => {
  const { main } = await import("./main");
  main();
});
