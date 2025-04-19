"use client";
import { useState } from 'react';
import { ChromePicker, type ColorResult } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (colorResult: ColorResult) => {
    onChange(colorResult.hex);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-md cursor-pointer border border-gray-300"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      />
      
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <ChromePicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
    </div>
  );
}