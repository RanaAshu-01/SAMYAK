import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { setupRecaptcha, auth } from "@/services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, Phone, UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";

const StudentSignup = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [confirmObj, setConfirmObj] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { loginWithPhone } = useAuth();
    const navigate = useNavigate();

    const onSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const verifier = setupRecaptcha('recaptcha-container-signup');
            // Defaulting to Indian code if missing, good UX
            const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
            const response = await loginWithPhone(formattedNumber, verifier);
            setConfirmObj(response);
            setStep(2);
        } catch (err) {
            console.error(err);
            // Show more detailed error for debugging
            if (err.code === 'auth/billing-not-enabled') {
                setError("Error: Firebase Free Plan limits SMS. Please Add this number to 'Phone numbers for testing' in Firebase Console.");
            } else {
                setError(`Failed to send OTP: ${err.code || err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const onVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await confirmObj.confirm(otp);
            // TODO: Here we could create a user document in Firestore if needed
            // for now, just redirect to test page
            navigate("/student/test");
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-3 rounded-full">
                            <UserPlus className="text-white h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
                    <CardDescription>Create an account to access tests</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4 text-center">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={onSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="Enter 10-digit number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    type="tel"
                                    required
                                />
                            </div>

                            <div id="recaptcha-container-signup"></div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={onVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <Input
                                    id="otp"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="number"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Register"}
                            </Button>

                            <Button variant="link" type="button" className="w-full" onClick={() => setStep(1)} disabled={loading}>
                                Change Phone Number
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        Already have an account? <Link to="/student/login" className="text-primary hover:underline">Login here</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default StudentSignup;
