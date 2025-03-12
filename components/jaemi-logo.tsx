import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface JaemiLogoProps {
  className?: string;
  size?: number;
}

export function JaemiLogo({ className, size = 48 }: JaemiLogoProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark" ? "/jaemi-logo-dark.svg" : "/jaemi-logo-light.svg";

  return (
    <Image
      src={logoSrc}
      alt="Jaemi Logo"
      width={size}
      height={size}
      className={cn(className)}
    />
  );
}
