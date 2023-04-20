import { MiniController } from "../src/js/game-dom/mini-controller";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mini-controller",
};

export const miniController = domStub(() => {
  const controller = new MiniController();
  controller.batteryPushNotigier().subscribe((battery) => {
    console.log(`battery ${battery}`);
  });
  controller.burstPushNotifier().subscribe(() => {
    console.log("burst");
  });
  controller.pilotPushNotifier().subscribe(() => {
    console.log("pilot");
  });
  return controller.getRootHTMLElement();
});
