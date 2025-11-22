import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function AuthLoading() {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled
      className="uppercase tracking-wider text-xs font-bold"
    >
      <Spinner className="mr-2 h-3 w-3" />
      Retrieving Session
    </Button>
  );
}
