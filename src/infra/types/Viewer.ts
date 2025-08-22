import { User } from "../../module/users/models/User";

export type Viewer = User & {
  isAdmin: boolean;
};
