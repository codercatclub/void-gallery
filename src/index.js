import AFRAME from 'aframe';
require('aframe-gltf-part-component');
require('aframe-extras');
import Foo from './components/Foo';
import CameraAnimation from './components/CameraAnimation';
import Particles from './components/Particles';
import Scroll from './components/Scroll';
import DynamicComponents from './systems/DynamicComponents';
import { Fresnel } from './shaders';

const THREE = AFRAME.THREE;

// Register all shaders
AFRAME.registerShader('fresnel', Fresnel);

// Register all systems
// AFRAME.registerSystem('dynamic-components', DynamicComponents);

// Register all components
AFRAME.registerComponent('foo', Foo);
AFRAME.registerComponent('camera-animation', CameraAnimation);
AFRAME.registerComponent('scroll', Scroll);
AFRAME.registerComponent('particles', Particles);
