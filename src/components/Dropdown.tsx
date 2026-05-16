import React from 'react';
import useDropdown from '@/hooks/useDropdown';

type Props = {
  children: React.ReactNode;
  label: string;
};

const Dropdown = ({ label, children }: Props) => {
  const [isOpen, setIsOpen, divRef] = useDropdown();

  return (
    <div className="modalWrapper" ref={divRef}>
      <button className="menuBtn" onClick={() => setIsOpen((prev) => !prev)}>
        {label}
      </button>

      {isOpen && <ul className="menu">{children}</ul>}
    </div>
  );
};
