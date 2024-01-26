import * as React from "react";

import { cn } from "@/lib/utils";

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: string;
  end: string;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ className, front, end, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col justify-center bg-slate-100", className)}
        ref={ref}
        {...props}
      >
        <div className="group h-96 w-96 [perspective: 1000px]">
          <div className="h-full w-full relative rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 text-center">
              <div className="flex min-h-full flex-col item-center justify-center">
                {front}
              </div>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col item-center justify-center">
                {end}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
FlipCard.displayName = "FlipCard";

export { FlipCard };
