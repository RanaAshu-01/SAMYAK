import { useState, useEffect } from 'react';
import { fetchBlogs } from '@/services/api';
import { BlogCard } from '@/components/features/BlogCard';
import { Loader2 } from 'lucide-react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchBlogs();
                setBlogs(data);
            } catch (err) {
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-12">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>

            {blogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">No blogs posted yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;
