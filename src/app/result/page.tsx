import { Suspense } from "react";
import { Result } from "./Result";

export default function Page() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}
