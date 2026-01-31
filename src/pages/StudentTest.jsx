import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LogOut, CheckCircle } from "lucide-react";

const StudentTest = () => {
    const { logout, currentUser } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <div className="max-w-4xl mx-auto space-y-8 mt-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Student Portal</h1>
                    <Button variant="outline" onClick={() => logout()}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                            <CheckCircle className="h-5 w-5" />
                            <span>You are successfully logged in with Phone: <strong>{currentUser?.phoneNumber}</strong></span>
                        </div>

                        <div className="mt-8 border-t pt-8">
                            <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
                            <div className="p-12 border-2 border-dashed rounded-lg text-center text-muted-foreground bg-white">
                                No active tests assigned at this moment.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentTest;
