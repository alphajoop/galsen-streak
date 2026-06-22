import { forwardRef } from "react";
import { siGithub } from "simple-icons/icons";

const brandIcons = {
  github: siGithub,
} as const;

interface BrandIconProps {
  brand: keyof typeof brandIcons;
  size?: number | string;
  className?: string;
  color?: string;
  useBrandColor?: boolean;
  title?: string;
}

export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(
  ({ brand, size = 24, className = "", color, useBrandColor = false, title, ...props }, ref) => {
    const icon = brandIcons[brand];
    const fillColor = color || (useBrandColor ? `#${icon.hex}` : "currentColor");
    const accessibleTitle = title || `${brand} icon`;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fillColor}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={accessibleTitle}
        {...props}
      >
        <title>{accessibleTitle}</title>
        <path d={icon.path} />
      </svg>
    );
  },
);

BrandIcon.displayName = "BrandIcon";

export const GithubIcon = forwardRef<SVGSVGElement, Omit<BrandIconProps, "brand">>((props, ref) => (
  <BrandIcon brand="github" ref={ref} {...props} />
));

GithubIcon.displayName = "GithubIcon";
