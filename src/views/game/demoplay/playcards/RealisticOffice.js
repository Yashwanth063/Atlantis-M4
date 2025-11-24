import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import PropTypes from 'prop-types';
import hdrFilePath from '../../../../assets/glb/venice_sunset_1k.hdr';
import RealOfficeGlbb from 'assets/glb/Realisticoffice.glb';




const defaultModelsActivity = {
  whoIsSpeaking: 'narrator', //on run time who is currently speaking
  playerEmotions: [], //['happy','surprised']
  npcEmotions: [], //['angry','ugly']
  cameraPosition: { x: 0, y: 0, z: 0 }, //
  playerModel: {
    isRequired: true, //default false
    scale: { x: 0.35, y: 0.4, z: 0.35 },
    position: { x: -3.5, y: 0, z: 2.2 },
    rotation: { x: 0, y: 11.5, z: 0 },
  },
  NpcModel: {
    isRequired: true, //default false
    scale: { x: 0.4, y: 0.42, z: 0.35 },
    position: { x: -6.2, y: 0, z: 1.5 },
    rotation: { x: 0, y: -11.8, z: 0 },
  }
}
const camera_start_position = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera_start_position = {x:-1.6, y:0.2,z: 4}; 
// camera_start_position.position.set(-1.6, 0.2, 4);
camera_start_position.position.set(-2.5, 1.8, 8.5);

camera_start_position.rotation.y = THREE.MathUtils.degToRad(-20);
camera_start_position.rotation.x = THREE.MathUtils.degToRad(-7);


// const BackgroundFeedback = ({ currentScreenId,setModalLoaded, modalLoaded , isScreenshot ,preloadedAssets, modelsActivity = { ...defaultModelsActivity }, camera_start_pos = camera_start_position }) => {

const RealOffice = ({
  currentScreenId,
  setModalLoaded,
  modalLoaded,
  preloadedAssets,
  modelsActivity = { ...defaultModelsActivity },
  GlbPlayindDetails, SetGlbPlayingDetails, isZoomComplete, setIsZoomComplete, glbName, NonPlayerNameLanguage,NonPlayerNameLanguageId,PlayerNameLanguage // Default value for modelsActivity
}) => {

  const refContainer = useRef();
  const mixerRef = useRef();
  const rendererRef = useRef(null);
  const playerMixerRef = useRef(null);
  const npcMixerRef = useRef(null);
  const clock = new THREE.Clock();
  const timeoutIds = useRef([]);

  // const [npcAnimationsRef.current, setNpcAnimations] = useState(null);

  // const [pcAnimationsRef.current, setPcAnimations] = useState(null);
  const npcAnimationsRef = useRef([]);
  console.log(npcAnimationsRef,'npcAnimationsRef')
  const pcAnimationsRef = useRef([]);
  console.log(pcAnimationsRef,'pcAnimationsRef')

  const [glbAnimations, setGlbAnimations] = useState([]);

  useLayoutEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const canvas = document.createElement('canvas');
      canvas.className = 'webgl';
      container.appendChild(canvas);
    }
    return () => {
      refContainer.current = null;
    }
  }, [currentScreenId]);

  useLayoutEffect(() => {
    
    const canvas = document.querySelector('canvas.webgl');
    if (!canvas) {
      
      console.error('Canvas element not found.');
      return;
    }
    const scene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xffffff, 0.63);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(preloadedAssets?.preloadedGLBs?.RealOfficeGlb?.src, (gltf) => {
  ;
  const model = gltf.scene;
//   model.rotation.y = THREE.MathUtils.degToRad(-90);
  model.position.z = 0;
  scene.add(model);
  setTimeout(()=>{setModalLoaded(true)},3000)
},
//  undefined, 
 (error) => {
  console.log('Error loading model:', error);
});

const normalizedKey1 = Object.keys(preloadedAssets?.preloadedGLBs).find(
  key => key.toLowerCase() === PlayerNameLanguage.toLowerCase()
);


const selectedPC = preloadedAssets?.preloadedGLBs?.[normalizedKey1]?.src;

// const selectedNPC = preloadedAssets.preloadedGLBs[NonPlayerNameLanguage];


if(selectedPC){
gltfLoader.load(
selectedPC,
(gltf) => {
const model = gltf.scene;
model.scale.set(1.2, 1.02, 1.2);
model.rotation.set(0, 8.7, 0);
model.position.set(2.4, 1.1, -2.5);
const playerMixer = new THREE.AnimationMixer(model);
playerMixerRef.current = playerMixer;
const animations = gltf.animations;
// setPcAnimations(animations);
  pcAnimationsRef.current = animations;
scene.add(model);
const idleAnimation = animations.find((anim) => anim.name === 'IDLE POSE');
if (idleAnimation) {

const idleAction = playerMixer.clipAction(idleAnimation);
idleAction.reset().fadeIn(0.2).play();
}
handleAnimations(playerMixer, animations);
},
undefined,
(error) => {
console.log(`Error loading model from :`, error);
}
)
}


const normalizedKey = Object.entries(preloadedAssets?.preloadedGLBs).find(
  ([key, value]) => value?.uniqueId === String(NonPlayerNameLanguageId)
);

// const selectedNPC = normalizedKey ? normalizedKey[0] : null;
const selectedNPC = normalizedKey ? normalizedKey[1]?.src : null;




if (selectedNPC) {
  gltfLoader.load(
    selectedNPC,
    (gltf) => {
      const model = gltf.scene;
      


        model.scale.set(1.2, 1.04, 1.2);
        model.rotation.set(0, 0.83, 0);
        model.position.set(2, 1.1, -3.5);
      if (gltf.animations && gltf.animations.length > 0) {
        const npcMixer = new THREE.AnimationMixer(model);
        npcMixerRef.current = npcMixer; // Assign only if animations exist
        const animations = gltf.animations;
        // setNpcAnimations(animations);
          npcAnimationsRef.current = animations;
        const idleAnimation = animations.find((anim) => anim.name === 'IDLE POSE');
        if (idleAnimation) {
          
          const idleAction = npcMixer.clipAction(idleAnimation);
          idleAction.reset().fadeIn(0.2).play();
        }
        handleAnimations(npcMixer, gltf.animations);
      } else {
        console.warn("No animations found for the NPC model.");
      }

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(`Error loading NPC model:`, error);
    }
  );
} else {
  console.error(`Invalid NPC selection: ${NonPlayerNameLanguage}`);
}



    function adjustSizes() {
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (window.innerHeight > window.innerWidth) {
        sizes = {
          width: window.innerHeight,
          height: window.innerWidth,
        };
      }
      return sizes;
    }
    let sizes = adjustSizes();


      sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    if (sizes.height > sizes.width) {
      [sizes.width, sizes.height] = [sizes.height, sizes.width];
    }



    const camera = new THREE.PerspectiveCamera(
        37.32,
        sizes.width / sizes.height,
        0.1,
        1500
      );
      camera.position.set(6.776, 2.724, -3.693);
      camera.rotation.set(
        -165.05 * (Math.PI / 180), 
        69.97 * (Math.PI / 180), 
        165.91 * (Math.PI / 180) 
      );
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    const resizeCallback = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

 if (sizes.height > sizes.width) [sizes.width, sizes.height] = [sizes.height, sizes.width];
  sizes.width = sizes.width;
  sizes.height = sizes.height;


      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener('resize', resizeCallback);
    let initialZoomOut = true;
    let animationFrameId;
    const zoomSpeed = 0.05;
    const endPosition = { x: -2.5, y: 1.8, z: 8.5 };
    const epsilon = 0.01;

    
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta(); // Get time elapsed per frame
    
      if (mixerRef.current) mixerRef.current.update(delta);
      if (playerMixerRef.current) playerMixerRef.current.update(delta);
      if (npcMixerRef.current) npcMixerRef.current.update(delta); // Remove * 150 multiplier
    
      rendererRef.current.render(scene, camera);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resizeCallback);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (refContainer.current) {
        while (refContainer.current.firstChild) {
          refContainer.current.removeChild(refContainer.current.firstChild);
        }
      }
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      if (scene.environment) {
        scene.environment.dispose();
      }
      cancelAnimationFrame(animationFrameId);
    };

  }, [currentScreenId]);

 

  useEffect(() => {
    if (currentScreenId === 14) {
      if (npcMixerRef.current) {
 

        const idleAnimation = npcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE');
        if (idleAnimation) {
          const idleAction = npcMixerRef.current.clipAction(idleAnimation);
          idleAction.reset().play();
        } else {
          console.error("NPC idle animation not found");
        }
      }
  
      if (playerMixerRef.current) {
       
        const idleAnimation = pcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE');
        if (idleAnimation) {
          playerMixerRef.current.stopAllAction();
          const idleAction = playerMixerRef.current.clipAction(idleAnimation);
          idleAction.reset().play();
        } else {
          console.error("Player idle animation not found");
        }}else {
          console.error("Player Mixer Not Found");
        }
      
    }
  }, [currentScreenId, npcAnimationsRef.current, pcAnimationsRef.current]); 


  // useEffect(() => {
    
  //   let timeoutId;

  //   const cleanup = () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId); // Clear the main timeout
  //     }
  //     timeoutIds.current.forEach((id) => clearTimeout(id)); // Clear all sequence timeouts
  //     timeoutIds.current = [];
  //     if (npcMixerRef.current) {
  //       npcMixerRef.current.stopAllAction(); // Stop NPC animations
  //     }
  //     if (playerMixerRef.current) {
  //       playerMixerRef.current.stopAllAction(); // Stop PC animations
  //     }
  //   };

  //   if (GlbPlayindDetails) {
  //     cleanup(); // Clean up before starting new animations

  //     // Set idle animations for both NPC and PC
  //     if (npcMixerRef.current) {
  //       const idleAction = npcMixerRef.current.clipAction(npcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE'));
  //       idleAction.reset().play();
  //     }
  //     if (playerMixerRef.current) {
  //       const idleAction = playerMixerRef.current.clipAction(pcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE'));
  //       idleAction.reset().play();
  //     }

  //     // Schedule the next animation after 100ms
  //     timeoutId = setTimeout(() => {
  //       if ((GlbPlayindDetails?.whospeak === 'NPC' || GlbPlayindDetails?.whospeak === 'PC') && currentScreenId !== 14) {
          
  //         handleAnimations(
  //           GlbPlayindDetails?.whospeak === 'NPC' ? npcMixerRef.current : playerMixerRef.current,
  //           GlbPlayindDetails?.whospeak === 'NPC' ? npcAnimationsRef.current : pcAnimationsRef.current
  //         );
  //       }
  //     }, 300);
  //   }

  //   return () => {
  //     cleanup(); 
  //   };
  // }, [GlbPlayindDetails]);
useEffect(() => {   
    let timeoutId;

    const cleanup = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutIds.current.forEach((id) => clearTimeout(id));
  timeoutIds.current = [];

  // Fade out NPC animations to idle
  if (npcMixerRef.current && npcAnimationsRef.current) {
    npcMixerRef.current._actions.forEach((action) => {
      if (action.getClip().name !== 'IDLE POSE') {
        action.fadeOut(0.2); // Smoothly fade out non-idle animations
      }
    });
    const idle = npcAnimationsRef.current.find(a => a.name === 'IDLE POSE');
    npcMixerRef.current.clipAction(idle).reset().fadeIn(0.2).play();
  }

  // Fade out PC animations to idle
  if (playerMixerRef.current && pcAnimationsRef.current) {
    playerMixerRef.current._actions.forEach((action) => {
      if (action.getClip().name !== 'IDLE POSE') {
        action.fadeOut(0.2);
      }
    });
    const idle = pcAnimationsRef.current.find(a => a.name === 'IDLE POSE');
    playerMixerRef.current.clipAction(idle).reset().fadeIn(0.2).play();
  }
};
    if (GlbPlayindDetails) {
      cleanup(); 
      console.log("currecntScreenId3",currentScreenId)

 if (npcMixerRef.current && npcAnimationsRef.current) {
    const idle = npcAnimationsRef.current.find(a => a.name === 'IDLE POSE');
    npcMixerRef.current.clipAction(idle).reset().play();
  }
  if (playerMixerRef.current && pcAnimationsRef.current) {
    const idle = pcAnimationsRef.current.find(a => a.name === 'IDLE POSE');
    playerMixerRef.current.clipAction(idle).reset().play();
  }
      // Schedule the next animation after 100ms
      timeoutId = setTimeout(() => {
        if ((GlbPlayindDetails?.whospeak === 'NPC' || GlbPlayindDetails?.whospeak === 'PC') && currentScreenId !== 14) {
         
          handleAnimations(
            GlbPlayindDetails?.whospeak === 'NPC' ? npcMixerRef.current : playerMixerRef.current,
            GlbPlayindDetails?.whospeak === 'NPC' ? npcAnimationsRef.current : pcAnimationsRef.current
          );
        }
      }, 300);
    }

    return () => {
      cleanup(); 
    };
  }, [GlbPlayindDetails,currentScreenId]);


  function handleAnimations(mixer, animations) {
      //  timeoutIds.current = []; 
      
    const playAnimation = (mixer, animation, loop = THREE.LoopRepeat, timeScale = 1,fadeDuration=0.5) => {
      
      const action = mixer.clipAction(animation);
      action.reset().fadeIn(0.5).play();
      mixer._actions?.forEach((act) => act.fadeOut(fadeDuration)); 
      // mixer.stopAllAction();
      action.reset();
      action.loop = loop;
      action.timeScale = timeScale;
      action.fadeIn(fadeDuration);
      action.play();
      return action;
    };

    const playSequence = (mixer, animations, idleAnimation, duration) => {
      // Clear any pending timeouts
      timeoutIds.current.forEach((id) => clearTimeout(id));
      timeoutIds.current = [];
    
      // Stop all ongoing animations
      // mixer.stopAllAction();
    
      const [anim1, anim2] = animations;
      const restDuration = duration - anim1.duration;
    
      // Play the first animation
      playAnimation(mixer, anim1);
    
      // Schedule the second animation
      const id1 = setTimeout(() => {
        if (GlbPlayindDetails?.whospeak === 'NPC' || GlbPlayindDetails?.whospeak === 'PC') {
          playAnimation(mixer, anim2);
    
          // Schedule the idle animation
          const id2 = setTimeout(() => {
            if (GlbPlayindDetails?.whospeak === 'NPC' || GlbPlayindDetails?.whospeak === 'PC') {
              playAnimation(mixer, idleAnimation);
            }
          }, restDuration * 1000);
          timeoutIds.current.push(id2); // Store the timeout ID
        }
      }, anim1.duration * 1000);
      timeoutIds.current.push(id1); // Store the timeout ID
    };

    const handleIdleAnimation = (mixer, animations) => {
      const idleAnimation = animations.find((anim) => anim.name === 'IDLE POSE');
      playAnimation(mixer, idleAnimation, THREE.LoopRepeat, 1);
    };

    const handleCharacterAnimations = (mixer, charAnimations, idleAnimation) => {
      const emotion = GlbPlayindDetails?.characteraction?.toUpperCase() || '';
      const multiAction = emotion.split(',').map((action) => action.trim());
      const duration = GlbPlayindDetails?.audioduration || 0;

      if (multiAction.length > 1) {
        const anim1 = charAnimations.find((anim) => anim.name === multiAction[0]) || idleAnimation;
        const anim2 = charAnimations.find((anim) => anim.name === multiAction[1]) || idleAnimation;
        playSequence(mixer, [anim1, anim2], idleAnimation, duration);
      } else {
        const targetAnimation = charAnimations.find((anim) => anim.name === emotion) || idleAnimation;
        playAnimation(mixer, targetAnimation);
        if (duration > 0) {
          
          // setTimeout(() => playAnimation(mixer, idleAnimation), duration * 1000);
          const time = setTimeout(() => playAnimation(mixer, idleAnimation), duration * 1000);
          timeoutIds.current.push(time)
        }
      }
    };

    // Idle for Narrator or specific screen
    if (mixer && (!GlbPlayindDetails?.whospeak || GlbPlayindDetails?.whospeak === 'Narrator' || currentScreenId === 14)) {
      handleIdleAnimation(mixer, animations);
    }

    // NPC animations
    if (mixer && npcAnimationsRef.current && GlbPlayindDetails?.whospeak === 'NPC') {
      const idleAnimation = npcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE');
      handleCharacterAnimations(mixer, npcAnimationsRef.current, idleAnimation);
    }

    // PC animations
    if (mixer && pcAnimationsRef.current && GlbPlayindDetails?.whospeak === 'PC') {
      const idleAnimation = pcAnimationsRef.current.find((anim) => anim.name === 'IDLE POSE');
      handleCharacterAnimations(mixer, pcAnimationsRef.current, idleAnimation);
    }
  }
  return (
    <div ref={refContainer} className='000000zz' style={{ height: "100%", width: "100%", position: "absolute" }}></div>
  );

};


RealOffice.propTypes = {
  currentScreenId: PropTypes.number,
  setModalLoaded: PropTypes.func,
  modalLoaded: PropTypes.bool,
  preloadedAssets: PropTypes.shape({
    preloadedGLBs: PropTypes.shape({
      
    }),
  }),
  modelsActivity: PropTypes.shape({
    whoIsSpeaking: PropTypes.oneOf(['player', 'npc', 'narrator']),
    playerEmotions: PropTypes.arrayOf(PropTypes.string),
    npcEmotions: PropTypes.arrayOf(PropTypes.string),
    cameraPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }),
    playerModel: PropTypes.shape({
      isRequired: PropTypes.bool,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
      }),
      rotation: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
      }),
    }),
    NpcModel: PropTypes.shape({
      isRequired: PropTypes.bool,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
      }),
      rotation: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
      }),
    }),
  }),
};

RealOffice.defaultProps = {
  modelsActivity: defaultModelsActivity,
}
export default React.memo(RealOffice);
