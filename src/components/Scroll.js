import AFRAME from "aframe";
const THREE = AFRAME.THREE;

export default {
  schema: {},

  init: function () {
    const menuEls = document.querySelectorAll(".menu ul");

    document.addEventListener("scroll", (event) => {
      event.preventDefault();
      this.el.object3D.position.z = (-0.001 * window.scrollY) * window.SCROLL_SPEED;

      const section = Math.floor(
        window.scrollY / window.SECTION_SCROLL_DISTANCE
      );

      menuEls.forEach((el) => {
        if (el.getAttribute("id") === `${section}`) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });

    });
  },
};
