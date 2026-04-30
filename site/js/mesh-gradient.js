/* ==========================================================================
   MLC — Three.js Mesh Gradient (Stripe-style flowing curves)
   Parametric sine-wave ribbons with WebGL, not noise blobs
   ========================================================================== */

import * as THREE from 'three';

(function initMeshGradient() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const meshCanvas = document.getElementById('meshCanvas');
  if (!meshCanvas || prefersReducedMotion) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const renderer = new THREE.WebGLRenderer({
    canvas: meshCanvas,
    antialias: false,
    alpha: false,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const meshMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime:       { value: 0.0 },
      uResolution: { value: new THREE.Vector2() },
      uAspect:     { value: 1.0 }
    },
    vertexShader: `
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uAspect;

      const vec3 BG = vec3(0.961, 0.961, 0.969);

      // Soft flowing curve — parametric sine waves with pure Gaussian falloff
      // No hard edges — colors diffuse and blend like watercolor
      float curve(vec2 uv, float base, float amp1, float freq1, float amp2, float freq2, float phase, float spread, float t) {
        float y = base
          + amp1 * sin(uv.x * freq1 + phase + t)
          + amp2 * sin(uv.x * freq2 + phase * 1.7 + t * 0.7);

        float d = abs(uv.y - y);
        // Pure Gaussian — wide, soft, blends with neighbors
        return exp(-d * d / (spread * spread));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;

        // Rotate UVs — curves sweep from top-right down to bottom-left
        float angle = -0.50;  // negative = top-right to bottom-left flow
        float sa = sin(angle);
        float ca = cos(angle);
        vec2 duv = vec2(
          uv.x * ca * uAspect - uv.y * sa,
          uv.x * sa * uAspect + uv.y * ca
        );

        float t = uTime * 0.25;

        // Edge mask — tighter to edges, more white in center + top
        float bottomMask = smoothstep(0.25, 0.0, uv.y);
        float leftMask   = smoothstep(0.15, 0.0, uv.x);
        float rightMask  = smoothstep(0.15, 0.0, 1.0 - uv.x);
        float topMask    = smoothstep(0.08, 0.0, 1.0 - uv.y) * 0.25;
        float mask = max(max(bottomMask, topMask), max(leftMask, rightMask) * 0.6);

        // 5 wide, soft curves — large Gaussian spread so they merge into each other
        // spread values are 3-5x wider than before — colors bleed together

        // 1. Warm gold
        float c1 = curve(duv, -0.15, 0.18, 1.6, 0.07, 3.5, 0.0, 0.35, t * 0.8);
        vec3 col1 = vec3(0.92, 0.72, 0.35);

        // 2. Soft rose
        float c2 = curve(duv, 0.0, 0.15, 2.0, 0.06, 4.5, 1.5, 0.30, t * 1.0);
        vec3 col2 = vec3(0.90, 0.45, 0.55);

        // 3. Muted lavender
        float c3 = curve(duv, -0.30, 0.16, 1.8, 0.07, 4.0, 3.0, 0.35, t * 0.7);
        vec3 col3 = vec3(0.62, 0.48, 0.85);

        // 4. Soft blue
        float c4 = curve(duv, -0.42, 0.14, 2.3, 0.06, 4.8, 4.5, 0.30, t * 0.9);
        vec3 col4 = vec3(0.42, 0.55, 0.85);

        // 5. Muted teal
        float c5 = curve(duv, 0.18, 0.12, 2.5, 0.05, 5.2, 6.0, 0.28, t * 1.15);
        vec3 col5 = vec3(0.25, 0.65, 0.72);

        // Subtle layering — lower intensity for background subtlety
        vec3 color = BG;
        color = mix(color, col4, c4 * 0.45 * mask);
        color = mix(color, col3, c3 * 0.50 * mask);
        color = mix(color, col1, c1 * 0.55 * mask);
        color = mix(color, col2, c2 * 0.50 * mask);
        color = mix(color, col5, c5 * 0.40 * mask);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    depthTest: false,
    depthWrite: false
  });

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    meshMaterial
  );
  scene.add(plane);

  let isVisible = false;
  const section = document.getElementById('why');
  if (section) {
    const observer = new IntersectionObserver(entries => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(section);
  }

  function resize() {
    const rect = meshCanvas.parentElement.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    meshMaterial.uniforms.uResolution.value.set(
      rect.width * renderer.getPixelRatio(),
      rect.height * renderer.getPixelRatio()
    );
    meshMaterial.uniforms.uAspect.value = rect.width / rect.height;
  }

  const startTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    meshMaterial.uniforms.uTime.value = (performance.now() - startTime) / 1000;
    renderer.render(scene, camera);
  }

  resize();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });
})();
