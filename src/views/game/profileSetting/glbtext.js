import React, { useRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import Bckground from 'assets/glb/compressed.glb'
// import Conferncehall from '../gamePlay/models/compressed.glb'
// ...



export default function Settings() {
  const gltfLoader = new GLTFLoader();
  const modelRef = useRef();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/path/to/draco/'); // Specify the path to the Draco decoder

  // Use the DRACOLoader for decoding Draco-compressed models
  gltfLoader.setDRACOLoader(dracoLoader);

  // gltfLoader.load(Conferncehall, (gltf) => {
  //   // Do something with the loaded model
  //   const model = gltf.scene;
  //   modelRef.current = model;
  // });
  return (
    <mesh ref={modelRef}>
      {/* You can add materials, textures, or other properties to the mesh */}
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

 