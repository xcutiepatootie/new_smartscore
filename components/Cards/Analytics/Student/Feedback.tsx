import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Feedback = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Teacher's Feedback</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      
    </Card>
  );
};

export default Feedback;
