import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/hooks/auth";
import {
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosinstance";
function AuthInitilizer() {
    const { setProvider, setUser, user } = useAuth();
    const query = useQuery({
        queryKey: ["auth"],
        queryFn: async () => (await axiosInstance.get("/auth/verify")).data,
        enabled: !!user,
    })
    const initializeUser: NextOrObserver<User> = async (user) => {
        if (user) {
            setUser({ ...user });
            const emailProvider = user.providerData.some(
                (provider) => provider.providerId === "password"
            );

            const goolgeProvider = user.providerData.some(
                (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            );
            if (emailProvider) setProvider("password");
            if (goolgeProvider) setProvider("google");
        } else {
            setUser(null);
            setProvider(null);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);
    useEffect(() => {
        if (query.data) {
            setUser({ ...user, role: query?.data?.data?.role, userId: query?.data?.data?.userId });
        }
    }, [query.data])
    return null;
}
export default AuthInitilizer;
