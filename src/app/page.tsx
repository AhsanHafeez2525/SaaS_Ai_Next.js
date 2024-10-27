import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <p className="text-6xl text-green-400">Hello SaaS Ai</p>
      <Button variant={"danger"} size={"lg"}>
        Click Me
      </Button>
    </div>
  );
}
