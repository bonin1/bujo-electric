import React, { ReactNode } from 'react';

/**
 * Parses bold text in markdown format (**text**)
 */
export const parseBold = (text: string): ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

/**
 * Parses markdown-like content and returns JSX elements
 */
export const parseMarkdownContent = (content: string): ReactNode[] => {
  if (!content) return [];
  
  const normalizedContent = content.replace(/\\n/g, '\n');
  
  return normalizedContent.split('\n\n').map((block, blockIndex) => {
    const lines = block.split('\n');
    const firstLine = lines[0];
    
    if (firstLine.startsWith('### ')) {
      return (
        <h3 key={blockIndex} className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3">
          {firstLine.replace('### ', '')}
        </h3>
      );
    }
    
    if (firstLine.startsWith('## ')) {
      return (
        <h2 key={blockIndex} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {firstLine.replace('## ', '')}
        </h2>
      );
    }
    
    if (lines.some(line => line.startsWith('- '))) {
      return (
        <ul key={blockIndex} className="space-y-2 ml-6 my-4 list-disc">
          {lines
            .filter(line => line.startsWith('- '))
            .slice(0, 5)
            .map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 pl-2">
                {parseBold(item.replace('- ', ''))}
              </li>
            ))}
        </ul>
      );
    }
    
    if (block.trim()) {
      return (
        <p key={blockIndex} className="text-gray-700 leading-relaxed mb-4">
          {parseBold(block)}
        </p>
      );
    }
    
    return null;
  });
};
