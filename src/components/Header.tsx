
import React from 'react';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("py-6", className)}>
      <div className="flex items-center justify-center">
        <Activity className="h-8 w-8 text-primary mr-2" strokeWidth={2.5} />
        <h1 className="text-2xl md:text-3xl font-bold">
          SkinVision<span className="text-primary">Aid</span>
        </h1>
      </div>
      <p className="text-center text-muted-foreground mt-2">
        AI-powered skin condition classification system
      </p>
    </header>
  );
};

export default Header;
