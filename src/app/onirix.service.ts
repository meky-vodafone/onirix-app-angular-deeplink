import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import OnirixSDK from '../../src/assets/onirix/ox-sdk.esm.js';

@Injectable({
  providedIn: 'root',
})
export class OnirixService {
  _model!: THREE.Group;
  oxSDK: any = null;
  _raycaster!: THREE.Raycaster;
  _animationMixers!: THREE.AnimationMixer[];
  _clock!: THREE.Clock;
  _envMap!: THREE.Texture;
  _modelPlaced = false;
  _carPlaced = false;
  _camera!: THREE.PerspectiveCamera;
  _renderer!: THREE.WebGLRenderer;
  _scene!: THREE.Scene;

  async initSDK() {
    this.oxSDK = new OnirixSDK(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3MTgzLCJwcm9qZWN0SWQiOjEyNDg0Mywicm9sZSI6MywiaWF0IjoxNzU5NjQ4MjY0fQ.z56P0TKW6TNFDygScXvrvgqfXHdyqB42lhwJojI0pkc'
    );
    const config = {
      mode: OnirixSDK.TrackingMode.Surface,
    };
    return this.oxSDK.init(config);
  }

  async init() {
    this._raycaster = new THREE.Raycaster();
    this._animationMixers = [];
    this._clock = new THREE.Clock(true);
    this._carPlaced = false;

    const renderCanvas = await this.initSDK();
    this.setupRenderer(renderCanvas);

    this.oxSDK.subscribe(OnirixSDK.Events.OnFrame, () => {
      const delta = this._clock.getDelta();

      this._animationMixers.forEach((mixer) => {
        mixer.update(delta);
      });

      this.render();
    });

    this.oxSDK.subscribe(
      OnirixSDK.Events.OnPose,
      (pose: Float32Array<ArrayBufferLike>) => {
        this.updatePose(pose);
      }
    );

    this.oxSDK.subscribe(OnirixSDK.Events.OnResize, () => {
      this.onResize();
    });

    this.oxSDK.subscribe(
      OnirixSDK.Events.OnHitTestResult,
      (hitResult: { position: THREE.Vector3 }) => {
        if (hitResult && this._model && !this._modelPlaced) {
          this._model.position.copy(hitResult.position);
          this._model.position.z = -3;
          this._scene.add(this._model);
          this._modelPlaced = true;
          this.oxSDK.start();
        }

        // if (this._modelPlaced) {
        //   this._model.position.copy(hitResult.position);
        // }
      }
    );

    // this.oxSDK.subscribe(OnirixSDK.Events.OnTrackingLost, () => {
    this.oxSDK.subscribe(OnirixSDK.Events.OnTouch, (pos: any) => {
      this.onModelClicked(pos);
    });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/bear.glb', (gltf) => {
      this._model = gltf.scene;
      // Play model animation
      if(gltf.animations){

        const mixer = new THREE.AnimationMixer(this._model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        this._animationMixers.push(mixer);
      }

      this._model.scale.set(1, 1, 1);
    });
  }

  setupRenderer(renderCanvas: HTMLCanvasElement) {
    const width = renderCanvas.width;
    const height = renderCanvas.height;

    // Initialize renderer with renderCanvas provided by Onirix SDK
    this._renderer = new THREE.WebGLRenderer({
      canvas: renderCanvas,
      alpha: true,
    });
    this._renderer.setClearColor(0x000000, 0);
    this._renderer.setSize(width, height);
    //@ts-ignore
    this._renderer.outputEncoding = THREE.sRGBEncoding;
    // this._renderer.outputColorSpace = THREE.SRGBColorSpace; // ✅ Correct for r170

    // Ask Onirix SDK for camera parameters to create a 3D camera that fits with the AR projection.
    const cameraParams = this.oxSDK.getCameraParameters();
    this._camera = new THREE.PerspectiveCamera(
      cameraParams.fov,
      cameraParams.aspect,
      0.1,
      200
    );
    this._camera.matrixAutoUpdate = false;

    // Create an empty scene
    this._scene = new THREE.Scene();

    // Add some lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    this._scene.add(ambientLight, directionalLight);
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  updatePose(pose: Float32Array) {
    // When a new pose is detected, update the 3D camera
    let modelViewMatrix = new THREE.Matrix4();
    modelViewMatrix = modelViewMatrix.fromArray(pose);
    this._camera.matrix = modelViewMatrix;
    this._camera.matrixWorldNeedsUpdate = true;
  }

  onResize() {
    // When device orientation changes, it is required to update camera params.
    const width = this._renderer.domElement.width;
    const height = this._renderer.domElement.height;
    const cameraParams = this.oxSDK.getCameraParameters();
    this._camera.fov = cameraParams.fov;
    this._camera.aspect = cameraParams.aspect;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }

  private onModelClicked(touchPos: { x: number; y: number }) {
    if (!this._model) return;

    console.log(touchPos);
    const mouse = new THREE.Vector2(touchPos.x, touchPos.y);
    this._raycaster.setFromCamera(mouse, this._camera);
    const intersects = this._raycaster.intersectObject(this._model, true);
    if (intersects.length > 0) {
      console.log('Model clicked');
      console.log(intersects);
      this._model.visible = false;
      // this._modelClicked.set(true);
    }
  }
}
