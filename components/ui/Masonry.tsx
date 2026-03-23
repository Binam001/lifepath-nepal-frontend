"use client";

import React from "react";

interface MasonryProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    lg?: number;
    md?: number;
    sm?: number;
  };
  gap?: number;
}

const Masonry: React.FC<MasonryProps> = ({ 
  children, 
  columns = { default: 4, lg: 3, md: 2, sm: 1 }, 
  gap = 16 
}) => {
  return (
    <div 
      className="masonry-grid"
      style={{
        columnCount: columns.default,
        columnGap: `${gap}px`,
      }}
    >
      <style jsx>{`
        .masonry-grid {
          width: 100%;
        }
        @media (max-width: 1200px) {
          .masonry-grid {
            column-count: ${columns.lg || columns.default} !important;
          }
        }
        @media (max-width: 900px) {
          .masonry-grid {
            column-count: ${columns.md || columns.lg || columns.default} !important;
          }
        }
        @media (max-width: 600px) {
          .masonry-grid {
            column-count: ${columns.sm || columns.md || columns.lg || columns.default} !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default Masonry;
