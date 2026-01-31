import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { Loader2, Download, LogOut, FileText, Users, BookOpen } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Need to create simple table or use div if not available.
// Actually, I don't have a Table component in ui yet. 
// I'll create a basic accessible table manually or just use standard HTML table with Tailwind classes for speed, 
// unless I want to create the Table component too.
// I'll use standard HTML table with Tailwind.

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState("contacts");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data based on active tab
    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (collectionName) => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, collectionName));
            const fetchedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                // Convert timestamps if any
                date: doc.data().date ? new Date(doc.data().date.seconds * 1000).toLocaleString() : '',
                createdAt: doc.data().createdAt ? new Date(doc.data().createdAt.seconds * 1000).toLocaleString() : ''
            }));
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
        XLSX.writeFile(workbook, `Samyak_${activeTab}_Data.xlsx`);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Admin Navbar */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <LockIcon className="h-5 w-5" /> Admin Panel
                </h1>
                <Button variant="destructive" size="sm" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button
                        variant={activeTab === "contacts" ? "default" : "outline"}
                        onClick={() => setActiveTab("contacts")}
                    >
                        <Users className="mr-2 h-4 w-4" /> Contacts
                    </Button>
                    <Button
                        variant={activeTab === "courses" ? "default" : "outline"}
                        onClick={() => setActiveTab("courses")}
                    >
                        <BookOpen className="mr-2 h-4 w-4" /> Courses
                    </Button>
                    <Button
                        variant={activeTab === "blogs" ? "default" : "outline"}
                        onClick={() => setActiveTab("blogs")}
                    >
                        <FileText className="mr-2 h-4 w-4" /> Blogs
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold capitalize">{activeTab} Data</h2>
                        <Button onClick={exportToExcel} disabled={loading || data.length === 0} className="bg-green-600 hover:bg-green-700">
                            <Download className="mr-2 h-4 w-4" /> Export to Excel
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : data.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No data found in {activeTab}.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border rounded-md">
                                <thead className="bg-slate-100 text-slate-700 uppercase">
                                    <tr>
                                        {/* Dynamic Headers based on first item keys, excluding ID */}
                                        {Object.keys(data[0]).filter(k => k !== 'id').slice(0, 6).map((key) => (
                                            <th key={key} className="px-4 py-3 border-b border-r last:border-r-0">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row) => (
                                        <tr key={row.id} className="border-b last:border-b-0 hover:bg-slate-50">
                                            {Object.keys(row).filter(k => k !== 'id').slice(0, 6).map((key) => (
                                                <td key={`${row.id}-${key}`} className="px-4 py-3 border-r last:border-r-0 truncate max-w-[200px]">
                                                    {typeof row[key] === 'object' ? JSON.stringify(row[key]) : row[key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)

export default AdminDashboard;
