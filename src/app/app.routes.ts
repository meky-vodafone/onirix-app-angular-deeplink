import { Routes } from "@angular/router";
import { BlippArAframeComponent } from "./components/blipp-ar-aframe/blipp-ar-aframe.component";

export const routes: Routes = [
  {
    path: "blippar-aframe",
    loadComponent: () =>
      import("./components/blipp-ar-aframe/blipp-ar-aframe.component").then(
        (m) => m.BlippArAframeComponent
      ),
  },
  {
    path: "",
    loadComponent: () =>
      import("./components/home/home.component").then(
        (m) => m.HomeComponent
      ),
  },
];
