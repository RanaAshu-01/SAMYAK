import { useState, useEffect } from 'react';
import { fetchCourses } from '@/services/api';
import { CourseCard } from '@/components/features/CourseCard';
import { Loader2 } from 'lucide-react';
import SEO from '@/components/layout/SEO';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (err) {
                setError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
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
            <SEO
                title="All Courses"
                description="Browse our comprehensive list of courses and start your journey today."
            />
            <h1 className="text-3xl font-bold mb-8">Our Courses</h1>

            {courses.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">No courses available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Courses;
