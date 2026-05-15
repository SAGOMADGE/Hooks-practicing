import { useEffect, useRef, useState } from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  // ставим слушателя на это событие
  useEffect(() => {
    // принимает как параметр любое событие мышки
    const handleClickOutside = (e: MouseEvent) => {
      // проверяет если событие мыши произошло за пределами нашего дива обертки - если да то снимаем флаг
      if (divRef.current && !divRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // при размонитровании компонента не забываем отписать от события

  return [isOpen, setIsOpen, divRef] as const;
};

export default useDropdown;
