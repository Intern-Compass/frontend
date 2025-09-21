import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

export const errorToast = (title: string, description: string) => {
  toast(
    <div className="flex items-start gap-3 font-sans">
      <CircleAlert className="text-error-base mt-0.5" />

      <div className="flex flex-col gap-2.5 text-sm leading-5">
        {title && <span className="text-foreground font-medium">{title}</span>}
        {description && (
          <span className="text-foreground/75 font-normal">{description}</span>
        )}
      </div>
    </div>,
    {
      classNames: {
        toast: "!bg-error-light",
      },
      position: "top-center",
    }
  );
};
