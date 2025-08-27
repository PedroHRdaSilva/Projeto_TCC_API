import { Collections } from "~/infra/types/Collections";
import { Viewer } from "~/infra/types/Viewer";

export type TGraphQLContext = {
  collections: Collections;
  viewer: Viewer | null;
  // loaders: ReturnType<typeof createLoaders>;
};
