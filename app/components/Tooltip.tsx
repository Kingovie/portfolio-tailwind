'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-[2px] bg-secondary text-foreground whitespace-nowrap transition-opacity duration-150",
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {content}
      </span>
    </div>
  );
}