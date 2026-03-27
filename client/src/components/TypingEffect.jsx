import React, { useState, useEffect } from 'react';

const TypingEffect = ({ texts, speed = 150, delay = 2000, loop = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentIndex];
      if (isDeleting) {
        // حذف حرف
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          if (!loop && currentIndex === texts.length - 1) return;
        }
      } else {
        // كتابة حرف
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts, speed, delay, loop]);

  return <span>{currentText}</span>;
};

export default TypingEffect;