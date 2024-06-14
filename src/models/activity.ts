
import Artifact from "./artifact";
import User from "./user";

type Activity = {
    id?: number;
    title: string;
    description: string;
    createdById?: number;
    assignedToId?: number | null;
    createdBy?: User;
    assignedTo?: User | null;
    artifacts?: Artifact[];
};

export default Activity;
