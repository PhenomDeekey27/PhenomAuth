"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";
import { performanceUtils } from "../lib/performance";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 3.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

// Background colors matching the website theme
#define DEEP_NAVY vec3(0.051, 0.059, 0.145)  // #0D0F25
#define DEEP_VIOLET vec3(0.122, 0.055, 0.227) // #1F0E3A

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) * 0.3 + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) * 0.8 + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed * 0.5;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  // Create gradient background matching website theme
  float gradientPos = vUv.y;
  vec3 bgColor = mix(DEEP_VIOLET, DEEP_NAVY, gradientPos);

  // Add subtle vignette effect
  float vignette = 1.0 - length(vUv - 0.5) * 0.5;
  bgColor *= vignette;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    // Blend stars with background gradient
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.4, alpha);
    alpha = min(alpha, 0.8); // Max 80% opacity for stars
    col = mix(bgColor, col, alpha);
    gl_FragColor = vec4(col, 1.0);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

interface GalaxyProps {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  className?: string;
}

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 0.7, // Further reduced from default of 1.0
  hueShift = 240,
  disableAnimation = false,
  speed = 0.3, // Further reduced from default of 0.5
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.5,
  mouseRepulsion = false,
  repulsionStrength = 0.5, // Further reduced from default of 1.0
  twinkleIntensity = 0.1,
  rotationSpeed = 0.01,
  autoCenterRepulsion = 0,
  transparent = true,
  ...rest
}: GalaxyProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);
  const isInViewRef = useRef(true);

  // Add state to track whether to render the galaxy or show static background
  const [isCanvasSupported, setIsCanvasSupported] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [animationSettings, setAnimationSettings] = useState({
    animationsEnabled: true,
    particleDensity: 1.0,
    fpsLimit: 60,
    effectsEnabled: true,
  });

  // Check if user prefers reduced motion or has performance constraints
  useEffect(() => {
    const settings = performanceUtils.getAnimationSettings();
    setAnimationSettings(settings);

    if (!settings.animationsEnabled) {
      setShouldRender(false);
    }
  }, []);

  useEffect(() => {
    if (
      !ctnDom.current ||
      !shouldRender ||
      !animationSettings.animationsEnabled
    )
      return;
    const container = ctnDom.current;

    // Check if WebGL is supported
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setIsCanvasSupported(false);
      return;
    }

    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
    });
    const glContext = renderer.gl;

    if (transparent) {
      glContext.enable(glContext.BLEND);
      glContext.blendFunc(glContext.SRC_ALPHA, glContext.ONE_MINUS_SRC_ALPHA);
      glContext.clearColor(0, 0, 0, 0);
    } else {
      glContext.clearColor(0, 0, 0, 1);
    }

    let program: Program;

    function resize() {
      const bounds = container.getBoundingClientRect();
      const width = Math.max(bounds.width, window.innerWidth);
      const height = Math.max(bounds.height, 400);
      const deviceScale = Math.min(window.devicePixelRatio, 1.5);
      const perfMultiplier = performanceUtils.isLowPerformanceDevice()
        ? 0.45
        : 0.65;
      const scale = Math.min(deviceScale * perfMultiplier, 1);

      renderer.setSize(width * scale, height * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          glContext.canvas.width,
          glContext.canvas.height,
          glContext.canvas.width / glContext.canvas.height
        );
      }

      // Ensure canvas covers full width
      if (glContext.canvas) {
        glContext.canvas.style.width = "100%";
        glContext.canvas.style.height = "100%";
        glContext.canvas.style.objectFit = "cover";
      }
    }

    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(glContext);
    program = new Program(glContext, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(
            glContext.canvas.width,
            glContext.canvas.height,
            glContext.canvas.width / glContext.canvas.height
          ),
        },
        uFocal: { value: new Float32Array(focal) },
        uRotation: { value: new Float32Array(rotation) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([
            smoothMousePos.current.x,
            smoothMousePos.current.y,
          ]),
        },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent },
      },
    });

    const mesh = new Mesh(glContext, { geometry, program });
    let animateId: number | null = null;

    // Enhanced scroll detection with multiple sensitivity levels
    let isScrolling = false;
    let scrollIntensity = 0;
    let scrollTimeout: number;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      isScrolling = true;
      scrollIntensity = Math.min(scrollVelocity / 10, 1); // Normalize scroll intensity

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
        scrollIntensity = 0;
        scrollVelocity = 0;
      }, 200); // Extended timeout to ensure smooth recovery
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Adaptive FPS based on scroll intensity and device performance
    const getAdaptiveFPS = () => {
      if (isScrolling) {
        if (scrollIntensity > 0.5) return 8; // 8fps for intense scrolling
        return 10; // 10fps for light scrolling
      }
      return animationSettings.fpsLimit > 30 ? 60 : 30; // Normal FPS
    };

    const throttleDelay = animationSettings.fpsLimit > 30 ? 16 : 32; // ~60fps or ~30fps
    let lastFrameTime = 0;

    function update(t: number) {
      if (!isInViewRef.current) {
        animateId = null;
        return;
      }

      // Adaptive FPS based on scroll intensity
      const adaptiveFPS = getAdaptiveFPS();
      const currentThrottleDelay = 1000 / adaptiveFPS;

      if (t - lastFrameTime >= currentThrottleDelay) {
        lastFrameTime = t;

        if (!disableAnimation) {
          // Reduce animation intensity during scrolling
          const scrollMultiplier = isScrolling ? 0.3 : 1.0;
          program.uniforms.uTime.value = t * 0.001 * scrollMultiplier;
          program.uniforms.uStarSpeed.value =
            ((t * 0.001 * starSpeed) / 10.0) * scrollMultiplier;
        }

        // Reduce mouse interaction smoothness during scrolling
        const lerpFactor = isScrolling ? 0.02 : 0.05;
        smoothMousePos.current.x +=
          (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
        smoothMousePos.current.y +=
          (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

        smoothMouseActive.current +=
          (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

        program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
        program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
        program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

        renderer.render({ scene: mesh });
      }

      animateId = requestAnimationFrame(update);
    }

    // Enhanced Intersection Observer with multiple thresholds and better root margins
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInViewRef.current;
        const intersectionRatio = entry.intersectionRatio;

        // More sophisticated view detection
        isInViewRef.current = entry.isIntersecting && intersectionRatio > 0.05;

        if (isInViewRef.current && !wasInView && animateId === null) {
          // Animation comes back into view - restart with progressive delay
          const delay = intersectionRatio > 0.5 ? 50 : 150; // Faster restart if more visible
          setTimeout(() => {
            if (isInViewRef.current && animateId === null) {
              // Start with reduced intensity and gradually increase
              let intensity = 0.1;
              const rampUp = setInterval(() => {
                intensity += 0.1;
                if (intensity >= 1.0 || !isInViewRef.current) {
                  clearInterval(rampUp);
                }
                // Update program uniforms with ramped intensity
                if (program) {
                  program.uniforms.uStarSpeed.value *= intensity;
                }
              }, 50);
              animateId = requestAnimationFrame(update);
            }
          }, delay);
        } else if (!isInViewRef.current && wasInView && animateId !== null) {
          // Animation goes out of view - stop immediately and clean up
          cancelAnimationFrame(animateId);
          animateId = null;
          // Reset uniforms to default values
          if (program) {
            program.uniforms.uTime.value = 0;
            program.uniforms.uStarSpeed.value = 0;
          }
        }
      },
      {
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.8], // More thresholds for granular control
        rootMargin: "-5% 0px -30% 0px", // More aggressive margins for better performance
      }
    );
    observer.observe(container);

    animateId = requestAnimationFrame(update);
    container.appendChild(glContext.canvas);

    function handleMouseMove(e: MouseEvent) {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (animateId !== null) {
        cancelAnimationFrame(animateId);
      }
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout as unknown as number);
      if (mouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      container.removeChild(glContext.canvas);
      glContext.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    focal,
    rotation,
    starSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent,
    shouldRender,
    animationSettings,
  ]);

  // If canvas is not supported or user prefers reduced motion, show a static background
  if (!shouldRender || !isCanvasSupported) {
    return (
      <div
        className="galaxy-canvas w-full h-full relative bg-gradient-to-br from-[#0D0F25] to-[#1F0E3A]"
        style={{ minHeight: "1400px" }}
        {...rest}
      />
    );
  }

  return (
    <div
      ref={ctnDom}
      className="galaxy-canvas w-full h-full relative"
      {...rest}
    />
  );
}
