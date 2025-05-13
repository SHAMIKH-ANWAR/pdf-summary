import { Delete } from "lucide-react";
import { Card } from "../ui/card";

export default function SummaryCard() {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
            <Delete
        </div>
      </Card>
    </div>
  );
}
