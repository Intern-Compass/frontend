import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock3, Reply, ThumbsUp } from "lucide-react";

export const Community = () => {
  return (
    <section>
      <header className="mb-4.5 flex justify-between items-center gap-4">
        <h2 className="text-lg leading-7">Community</h2>

        <Button variant="link" className="font-medium text-link">
          View all
        </Button>
      </header>

      <article className="border border-border rounded-[0.625rem] py-4.5 px-3">
        <div className="flex gap-x-2.5">
          <div className="flex gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://gihub.com/shadcn.png" />
              <AvatarFallback className="text-base-color bg-secondary">
                OD
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="gap-y-1 mb-7.75">
                <div className="flex items-center gap-7.5">
                  <h3 className="text-xl leading-6">Opemipo Ashiru</h3>
                  <div className="flex items-center gap-1.25">
                    <Clock3 className="w-4 h-4 text-black/38" />
                    <span className="text-black/35 text-xs leading-6">
                      1 day ago
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supervisor, Information Technology
                </p>
              </div>
              <div>
                <h4 className="text-xl font-medium leading-7 mb-1">
                  Accessibility in Design
                </h4>
                <div className="leading-6">
                  <p>
                    Attached below is a link to an article on accessibility in
                    design, this will help you gain knowledge in creating
                    user-centric designs. Please read up and let me know your
                    thoughts.
                    <br />
                    Link: <a href="#">https://medium.incluslivityforall.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Button variant="ghost">
                  <ThumbsUp className="text-chart-1" />
                  <span>5</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-1.25">
                  <Reply className="text-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground">1 reply</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
