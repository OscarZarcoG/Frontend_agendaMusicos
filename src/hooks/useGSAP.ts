'use client';

import { useEffect, useRef, MutableRefObject } from 'react';
import { gsap } from 'gsap';

// Hook para animaciones GSAP
export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline();
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const animateIn = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        ...options,
      }
    );
  };

  const animateOut = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.4,
      ease: 'power2.in',
      ...options,
    });
  };

  const staggerIn = (elements: HTMLElement[] | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        ...options,
      }
    );
  };

  const pulseAnimation = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      scale: 1.05,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      ...options,
    });
  };

  const floatAnimation = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      ...options,
    });
  };

  const rotateAnimation = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 10,
      ease: 'none',
      repeat: -1,
      ...options,
    });
  };

  const morphAnimation = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      borderRadius: '50%',
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      ...options,
    });
  };

  const slideInFromLeft = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
      }
    );
  };

  const slideInFromRight = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
      }
    );
  };

  const scaleIn = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        ...options,
      }
    );
  };

  const timeline = timelineRef.current;

  return {
    timeline,
    animateIn,
    animateOut,
    staggerIn,
    pulseAnimation,
    floatAnimation,
    rotateAnimation,
    morphAnimation,
    slideInFromLeft,
    slideInFromRight,
    scaleIn,
  };
};

// Hook para animaciones de contador
export const useCounterAnimation = (endValue: number, duration: number = 2) => {
  const elementRef = useRef<HTMLElement>(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    if (elementRef.current) {
      gsap.to(counterRef.current, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (elementRef.current) {
            elementRef.current.textContent = Math.round(counterRef.current.value).toLocaleString();
          }
        },
      });
    }
  }, [endValue, duration]);

  return elementRef;
};

// Hook para animaciones de texto
export const useTextAnimation = () => {
  const splitText = (element: HTMLElement) => {
    const text = element.textContent || '';
    const chars = text.split('');
    element.innerHTML = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
    
    return element.children;
  };

  const typeWriter = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;

    const chars = splitText(el);
    
    gsap.set(chars, { opacity: 0 });
    
    return gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: 'none',
      ...options,
    });
  };

  const fadeInWords = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;

    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = '';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.25em';
      el.appendChild(span);
    });
    
    const wordElements = el.children;
    gsap.set(wordElements, { opacity: 0, y: 20 });
    
    return gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options,
    });
  };

  return {
    typeWriter,
    fadeInWords,
    splitText,
  };
};