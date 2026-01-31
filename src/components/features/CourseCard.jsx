import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CreditCard } from "lucide-react"

export function CourseCard({ course }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                    {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        {course.fees}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Enroll Now</Button>
            </CardFooter>
        </Card>
    )
}
