'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name?: string | null;
  className?: string;
}

export function DynamicIcon({ name, className = 'w-6 h-6' }: DynamicIconProps) {
  if (!name) {
    const DefaultIcon = LucideIcons.Layers;
    return <DefaultIcon className={className} />;
  }

  // Cast icon collection
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[name] || LucideIcons.Layers;

  return <IconComponent className={className} />;
}
