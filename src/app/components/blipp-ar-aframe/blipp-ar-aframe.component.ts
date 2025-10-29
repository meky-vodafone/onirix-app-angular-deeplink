import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// Import A-Frame and its components (from npm)
import "aframe";
import "aframe-extras";
import "aframe-environment-component";
@Component({
  selector: "app-blipp-ar-aframe",
  imports: [],
  templateUrl: "./blipp-ar-aframe.component.html",
  styleUrl: "./blipp-ar-aframe.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlippArAframeComponent {
  private webarLoaded = false;

  ngAfterViewInit(): void {
    if (!this.webarLoaded) {
      const script = document.createElement("script");
      script.src = "blippar-webar-sdk/webar-sdk/webar-sdk-v2.0.8.min.js";
      script.async = true;
      
      // Set all the attributes
      script.setAttribute("webar-mode", "surface-tracking");
      script.setAttribute("auto-init", "false");
      script.setAttribute("auto-start", "true");
      script.setAttribute("auto-start-tracking", "true");
      script.setAttribute("static-camera", "true");
      script.setAttribute("render-scene-on-desktop", "true");
      script.setAttribute("show-qr-card-on-desktop", "true");
      script.setAttribute("ios-camera-permission", "false");
      script.setAttribute("enable-photo-ui", "true");
      script.setAttribute("alert-border-radius", "5px");
      script.setAttribute("alert-button-border-radius", "3px");
      // script.setAttribute("logo-src", "./images/test_logo_here.png");
      script.setAttribute("logo-width", "116px");
      script.setAttribute("logo-height", "116px");
      script.setAttribute("progress-dot-ring-scale", "0.30");
      script.setAttribute("progress-dot-ring-color", "#00AAFF");
      script.setAttribute("progress-ring-scale", "0.36");
      script.setAttribute("progress-ring-color", "#00FFFF");
      script.setAttribute("progress-ring-line-width", "5");
      
      // Alert styling
      script.setAttribute("alert-border-color", "#00FFFF");
      script.setAttribute("alert-border-width", "5px");
      script.setAttribute("alert-background-color", "#283747");
      script.setAttribute("alert-message-text-color", "#00AAFF");
      script.setAttribute("alert-button-color", "#00FFFF");
      script.setAttribute("alert-button-text-color", "#283747");
      script.setAttribute("alert-button-height", "50px");
      script.setAttribute("alert-camera-permission-text", "We need to ask for access to the camera so this experience can work!!!");
      script.setAttribute("alert-camera-permission-button-text", "No Problem");
      script.setAttribute("alert-motion-permission-text", "Now we need access to motion sensors!!!");
      script.setAttribute("alert-motion-permission-button-text", "No Problem");
      script.setAttribute("alert-box-width", "290px");
      script.setAttribute("alert-box-height", "182px");
      script.setAttribute("alert-box-font-size", "24px");
      
      // UI configuration
      script.setAttribute("ui-background-color", "#283747");
      script.setAttribute("ui-text-color", "#00FFFF");
      script.setAttribute("ui-portrait-text", "This experience is optimised for portrait display only");
      // script.setAttribute("desktop-logo-src", "./images/test_desktop_logo.png");
      script.setAttribute("desktop-logo-width", "108px");
      script.setAttribute("desktop-logo-height", "30px");
      // script.setAttribute("issue-img-src", "./images/test_issue_img.png");
      script.setAttribute("issue-img-width", "116px");
      script.setAttribute("issue-img-height", "116px");
      script.setAttribute("show-guide-view", "true");
      script.setAttribute("show-guide-animation-url", "");

      script.onload = () => {
        this.webarLoaded = true;
        // Optionally, call initWebAR here if you want to auto-initialize
        this.initWebAR();
        console.log("WEBAR SDK loaded:", (window as any).WEBARSDK);
      };
      document.body.appendChild(script);
    }
  }

  private initWebAR(): void {
    const WEBARSDK = (window as any).WEBARSDK;
    if (!WEBARSDK) {
      console.error("WEBARSDK is not loaded yet.");
      return;
    }
    WEBARSDK.Init();

    WEBARSDK.SetGuideViewCallbacks(
      () => console.log("Start guide animation"),
      () => console.log("Stop guide animation")
    );

    WEBARSDK.SetVideoStartedCallback(() => {
      const deskenv = document.getElementById("deskenv");
      deskenv?.parentNode?.removeChild(deskenv);
    });

    WEBARSDK.SetARModelPlaceCallback(() => {
      console.log("AR model placed");
    });

    WEBARSDK.SetResetButtonCallback(() => {
      console.log("Reset button clicked");
    });
  }
}
