import React from "react";

export default function TabButton({
  onClick,
  text,
  active,
}: {
  onClick: () => void;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={` px-4 py-2 ${
        active ? "bg-blue-800" : "bg-blue-600"
      } rounded-full cursor-pointer text-white `}
      onClick={onClick}
    >
      {text ?? "Tab"}
    </div>
  );
}
