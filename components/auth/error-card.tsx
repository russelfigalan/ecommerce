import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const errorCard = () => {
  return (
    <>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>Something went wrong.</CardContent>
          <CardFooter>
            <Button variant={"link"}>
              <Link href={"/"}>Back to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};
