/* ==========================================================================
   CTA Section — WebGL Shader Background
   Stripe-style pulsating dot grid with flowing energy lines
   ========================================================================== */

import * as THREE from 'three';

(function () {
  const canvas = document.getElementById('ctaCanvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      // Gold palette
      const vec3 gold     = vec3(0.773, 0.643, 0.424);
      const vec3 goldDim  = vec3(0.773, 0.643, 0.424) * 0.3;
      const vec3 blue     = vec3(0.145, 0.388, 0.922);

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        float aspect = uResolution.x / uResolution.y;
        vec2 coord = uv;
        coord.x *= aspect;

        // Grid
        float gridSize = 28.0;
        vec2 gridUV = coord * gridSize;
        vec2 cell = floor(gridUV);
        vec2 f = fract(gridUV) - 0.5;

        float t = uTime * 0.4;

        // Dot at each grid intersection
        float dotDist = length(f);
        float dotRadius = 0.06;

        // Pulse: each dot pulses at a slightly different phase
        float phase = hash(cell) * 6.28;
        float pulse = 0.5 + 0.5 * sin(t * 1.5 + phase);

        // Dot brightness — base + pulse
        float dot = smoothstep(dotRadius + 0.02, dotRadius - 0.02, dotDist);
        float dotAlpha = dot * (0.15 + 0.25 * pulse);

        // Connection lines between dots — horizontal and vertical
        float lineH = smoothstep(0.025, 0.0, abs(f.y)) * smoothstep(0.5, 0.25, abs(f.x));
        float lineV = smoothstep(0.025, 0.0, abs(f.x)) * smoothstep(0.5, 0.25, abs(f.y));
        float lines = max(lineH, lineV) * 0.08;

        // Flowing energy wave — diagonal sweep
        float wave1 = sin(coord.x * 3.0 - coord.y * 2.0 + t * 1.2) * 0.5 + 0.5;
        float wave2 = sin(coord.x * -2.0 + coord.y * 4.0 + t * 0.8 + 1.5) * 0.5 + 0.5;
        float energy = pow(wave1, 5.0) * 0.2 + pow(wave2, 6.0) * 0.12;

        // Inverted vignette — visible at EDGES, transparent in CENTER where text is
        vec2 center = vec2(0.5 * aspect, 0.5);
        float distFromCenter = length((uv - vec2(0.5)) * vec2(aspect, 1.0));
        float edgeMask = smoothstep(0.15, 0.55, distFromCenter);

        // Mouse proximity glow — only at edges
        vec2 mouseCoord = uMouse;
        mouseCoord.x *= aspect;
        float mouseDist = length(coord - mouseCoord);
        float mouseGlow = exp(-mouseDist * mouseDist * 8.0) * 0.15;

        // Compose color
        vec3 col = goldDim * dotAlpha;
        col += gold * energy;
        col += gold * lines;
        col += mix(gold, blue, 0.3) * mouseGlow;

        float alpha = (dotAlpha + lines + energy + mouseGlow) * edgeMask;

        col *= 1.5;
        alpha = min(alpha, 0.5);

        gl_FragColor = vec4(col, alpha);
      }
    `
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    renderer.setSize(w, h);
    // Reset inline styles that setSize adds so CSS position:absolute stays in control
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    material.uniforms.uResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
  }

  // Mouse tracking
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.parentElement.getBoundingClientRect();
    material.uniforms.uMouse.value.set(
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height
    );
  });

  // Intersection Observer — only animate when visible
  let isVisible = false;
  const observer = new IntersectionObserver(entries => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(canvas.parentElement);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
})();
