/**
 * InlineEdit — Click-to-edit cell for task scores
 */

import { useState, useRef, useEffect } from 'react';
import { MAX_SCORE, MIN_SCORE } from '../../utils/constants';

export default function InlineEdit({ value, onSave, placeholder = '—' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStart = () => {
    setEditValue(value !== null && value !== undefined ? String(value) : '');
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = editValue.trim();

    if (trimmed === '') {
      // Empty = null (belum mengumpulkan)
      onSave(null);
      return;
    }

    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && num >= MIN_SCORE && num <= MAX_SCORE) {
      onSave(num);
    }
    // Invalid input — revert silently
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        min={MIN_SCORE}
        max={MAX_SCORE}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-14 h-7 text-center text-xs font-medium rounded-md
          bg-primary-500/20 border border-primary-500/50 text-primary-200
          outline-none focus:ring-1 focus:ring-primary-500/50
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none"
      />
    );
  }

  return (
    <button
      onClick={handleStart}
      className="w-14 h-7 text-center text-xs font-medium rounded-md
        transition-all duration-150 cursor-pointer
        hover:bg-surface-600/50 hover:scale-105 active:scale-95"
      title="Klik untuk edit"
    >
      {value !== null && value !== undefined ? value : (
        <span className="text-surface-600">{placeholder}</span>
      )}
    </button>
  );
}
