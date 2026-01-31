import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Trophy, Loader2 } from "lucide-react";
import { fetchCourses } from "@/services/api";
import { CourseCard } from "@/components/features/CourseCard";

const Home = () => {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                // Ideally this would be a specific query for 'featured' courses
                const data = await fetchCourses();
                // Just take first 3 for demo
                setFeaturedCourses(data.slice(0, 3));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadFeatured();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Welcome to <span className="text-primary-foreground">Samyak Institute</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Empowering your future with industry-leading education and practical skills. Join us to unlock your potential.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/courses">
                            <Button size="lg" className="gap-2">
                                Explore Courses <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Courses</h2>
                        <p className="text-muted-foreground">Pick the right course for your career path.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : featuredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground pb-8">Check back soon for upcoming courses!</p>
                    )}

                    <div className="mt-10 text-center">
                        <Link to="/courses">
                            <Button variant="outline">View All Courses</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <BookOpen className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Expert Curriculum</CardTitle>
                            <CardDescription>Courses designed by industry experts.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Users className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Experienced Mentors</CardTitle>
                            <CardDescription>Learn from the best in the field.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Trophy className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Career Growth</CardTitle>
                            <CardDescription>Job assistance and career guidance.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;
