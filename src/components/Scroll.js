import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

export default {
  schema: {
  },

  init: function () {
    console.log(document.querySelector('.sections'));
    document.addEventListener('scroll', (event) => {
      event.preventDefault();
      this.el.object3D.position.z = -0.001*window.scrollY + 1;
    });
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
}
