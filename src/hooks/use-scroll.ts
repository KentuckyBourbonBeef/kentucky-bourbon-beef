import { useCallback } from 'react';

export const useScrollToSection = () => {
  return useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 20; // Add a small offset to account for any fixed headers
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);
};