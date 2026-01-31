import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BlogCard({ blog }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription>{new Date(blog.date.seconds * 1000).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {blog.excerpt}
                </p>
                <Button variant="link" className="px-0 mt-4">
                    Read More
                </Button>
            </CardContent>
        </Card>
    )
}
