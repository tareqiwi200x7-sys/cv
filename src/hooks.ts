import { useState, useEffect } from 'react';

const words = ['عملاء جدد', 'مبيعات أكثر', 'أرباحاً أعلى', 'نجاحاً حقيقياً'];

export const useTypingEffect = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return text;
};

export const useCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const animateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x - 20) * 0.12,
        y: prev.y + (mousePosition.y - prev.y - 20) * 0.12
      }));
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return { mousePosition, followerPosition, isHovering };
};
