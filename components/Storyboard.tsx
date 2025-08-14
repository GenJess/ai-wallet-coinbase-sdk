"use client";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function Storyboard({ images }: Props) {
  const panels = new Array(9).fill(null);
  return (
    <div className="grid grid-cols-3 gap-4">
      {panels.map((_, i) => (
        <div
          key={i}
          className="w-48 h-48 bg-gray-800 border border-gray-700 rounded flex items-center justify-center overflow-hidden"
        >
          {images[i] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[i]}
              alt={`Panel ${i + 1}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500 text-sm">Panel {i + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}
