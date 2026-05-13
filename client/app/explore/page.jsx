// app/explore/page.js (Server Component)
import { Suspense } from "react";
import ExploreContent from "./ExploreContent";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
