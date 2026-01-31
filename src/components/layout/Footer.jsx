import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Samyak Institute</h3>
                        <p className="text-sm text-slate-400">
                            Empowering students with industry-leading courses and practical skills for a brighter future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition">Courses</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/blogs" className="hover:text-white transition">Blogs</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Education Lane, Knowledge City, India</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>info@samyakinstitute.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Samyak Institute. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
