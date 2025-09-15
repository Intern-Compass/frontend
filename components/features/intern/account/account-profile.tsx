import { UsersRound } from "lucide-react";

export const AccountProfile = () => {
  return (
    <div className="bg-card rounded-lg p-2 md:p-6">
      <div className="mb-4 flex items-center">
        <UsersRound />
        <h2 className="text-2xl font-medium ml-2">Profile</h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Name</h3>
          <p className="text-muted-foreground text-sm">John Doe</p>
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Email</h3>
          <p className="text-muted-foreground text-sm">johndoe@gmail.com</p>
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">
            Internship Duration
          </h3>
          <p className="text-muted-foreground text-sm">6 months</p>
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">School</h3>
          <p className="text-muted-foreground text-sm">Convenant University</p>
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Phone no</h3>
          <p className="text-muted-foreground text-sm">08062061234</p>
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Department</h3>
          <p className="text-muted-foreground text-sm">
            Information Technology
          </p>
        </div>
      </div>
    </div>
  );
};
