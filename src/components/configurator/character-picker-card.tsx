"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { CharacterDef } from "@/types";
import { cn } from "@/lib/utils/cn";

interface CharacterPickerCardProps {
  character: CharacterDef;
  name: string;
  selected: boolean;
  disabled?: boolean;
  dlcLabel?: string;
  onToggle: () => void;
}

export function CharacterPickerCard({
  character,
  name,
  selected,
  disabled,
  dlcLabel,
  onToggle,
}: CharacterPickerCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled && !selected}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex flex-col items-center gap-2.5 rounded-[var(--radius-lg)] border p-3 text-center transition-all duration-300",
        selected
          ? "border-transparent bg-panel-raised"
          : "border-line bg-panel hover:border-bone-faint",
        disabled && !selected && "cursor-not-allowed opacity-40",
      )}
      style={
        selected
          ? { boxShadow: `0 0 0 1.5px ${character.colorAccent}` }
          : undefined
      }
    >
      {character.isDLC && (
        <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-panel px-2 py-0.5 font-mono text-[10px] uppercase text-bone-faint">
          <Lock size={9} />
          DLC
        </span>
      )}

      <div className="relative h-14 w-14">
        <Image
          src={character.image}
          alt={name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <span className="w-full px-1 text-xs leading-tight text-bone">{name}</span>

      {character.isDLC && dlcLabel && (
        <span className="text-[10px] leading-tight text-bone-faint">{dlcLabel}</span>
      )}
    </motion.button>
  );
}
