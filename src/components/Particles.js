import AFRAME from "aframe";
import particleVert from "../shaders/ParticleVert.glsl";
import particleFrag from "../shaders/ParticleFrag.glsl";
import improvedNoise from "./ImprovedNoise";
const perlin = new improvedNoise();
const THREE = AFRAME.THREE;

const DIM = 20;
const PARTICLE_COUNT = DIM * DIM * DIM;

export default {
  schema: {
    color: { type: "color", default: new THREE.Color() },
  },

  init: function () {
    const entity = this.el.object3D;
    const camera = document.querySelector("#camera");
    this.camera = camera.object3D;

    var particleGeo = new THREE.SphereBufferGeometry(0.05, 2, 2);

    var particleGeometry = new THREE.InstancedBufferGeometry();
    particleGeometry.index = particleGeo.index;
    particleGeometry.attributes.position = particleGeo.attributes.position;
    particleGeometry.attributes.uv = particleGeo.attributes.uv;
    particleGeometry.attributes.normal = particleGeo.attributes.normal;

    var offsetArray = new Float32Array(PARTICLE_COUNT * 3);
    var offsetAttribute = new THREE.InstancedBufferAttribute(offsetArray, 3);
    particleGeometry.addAttribute("offset", offsetAttribute);

    var countArray = new Float32Array(PARTICLE_COUNT);
    var countAttribute = new THREE.InstancedBufferAttribute(countArray, 1);
    particleGeometry.addAttribute("count", countAttribute);

    //fill starting point attributes
    for (var i = 0; i < DIM; i++) {
      for (var j = 0; j < DIM; j++) {
        for (var k = 0; k < DIM; k++) {
          var z = perlin.noise(
            Math.cos(i / 3),
            Math.sin(j / 3),
            Math.sin(k / 3)
          );
          var idx = DIM * DIM * i + DIM * j + k;
          countAttribute.array[idx] = 3000 * Math.random();
          offsetAttribute.array[3 * idx] =
            40 * (z * (i - DIM / 2) + Math.random() - 0.5);
          offsetAttribute.array[3 * idx + 1] =
            40 * (z * (j - DIM / 2) + Math.random() - 0.5);
          offsetAttribute.array[3 * idx + 2] =
            40 * (z * (k - DIM / 2) + Math.random() - 0.5);
        }
      }
    }
    offsetAttribute.needsUpdate = true;
    countAttribute.needsUpdate = true;

    this.el.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        particles_c1: { value: new THREE.Color(this.data.color) },
      },
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.particleSystem = new THREE.Mesh(particleGeometry, this.el.material);
    this.particleSystem.frustumCulled = false;

    entity.add(this.particleSystem);
  },

  update: function () {
    this.el.material.uniforms.particles_c1 = {
      value: new THREE.Color(this.data.color),
    };
  },

  tick: function (time, timeDelta) {
    //TODO: pulse
    this.el.material.uniforms.time.value = time;
  },
};
