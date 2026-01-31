import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import About from '@/pages/About';
import Blogs from '@/pages/Blogs';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import StudentLogin from '@/pages/StudentLogin';
import StudentSignup from '@/pages/StudentSignup';
import AdminDashboard from '@/pages/AdminDashboard';
import StudentTest from '@/pages/StudentTest';
import { RequireAuth } from './RequireAuth';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/signup" element={<StudentSignup />} />

            {/* Protected Routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <RequireAuth>
                        <AdminDashboard />
                    </RequireAuth>
                }
            />
            <Route
                path="/student/test"
                element={
                    <RequireAuth>
                        <StudentTest />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
