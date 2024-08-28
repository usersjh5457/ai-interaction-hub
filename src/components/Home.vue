<template>
  <div class="relative min-h-screen overflow-hidden">
    <canvas
      ref="rippleCanvas"
      class="absolute top-0 left-0 w-full h-full"
    ></canvas>
    <div
      class="relative z-10 min-h-screen flex items-center justify-center px-4"
    >
      <transition appear name="fade">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-8">AI Interaction Hub</h1>
          <div class="space-y-4">
            <router-link
              to="/text-communication"
              class="block w-64 mx-auto bg-white text-purple-600 rounded-lg py-3 px-4 font-semibold hover:bg-purple-100 transition duration-300"
            >
              AI Text Communication
            </router-link>
            <router-link
              to="/image-derivation"
              class="block w-64 mx-auto bg-white text-indigo-600 rounded-lg py-3 px-4 font-semibold hover:bg-indigo-100 transition duration-300"
            >
              AI Image Derivation
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePg",
  data() {
    return {
      ripples: [],
      animationId: null,
      ctx: null,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initRippleEffect();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    initRippleEffect() {
      const canvas = this.$refs.rippleCanvas;
      this.ctx = canvas.getContext("2d");
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;

      this.createGradientBackground();

      this.animate();
    },
    createGradientBackground() {
      const gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.width,
        this.height
      );
      gradient.addColorStop(0, "rgba(102, 126, 234, 0.5)");
      gradient.addColorStop(1, "rgba(118, 75, 162, 0.5)");
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    },

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.createGradientBackground();

      this.ripples.forEach((ripple, index) => {
        ripple.radius += 3;
        ripple.alpha -= 0.01;

        this.ctx.beginPath();
        this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
        this.ctx.fill();

        if (ripple.alpha <= 0) {
          this.ripples.splice(index, 1);
        }
      });

      this.animationId = requestAnimationFrame(this.animate);
    },
    handleResize() {
      const canvas = this.$refs.rippleCanvas;
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;
      this.createGradientBackground();
    },
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
