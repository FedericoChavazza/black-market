import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Products, SetterFunction } from "@/interfaces";

interface User {
  uid: string;
  likedProducts?: string[];
  boughtProducts?: Products[];
  cart: Products[];
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setExtendedUser: SetterFunction<User | null>;
  setJustSignedUp: SetterFunction<boolean>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  setExtendedUser: () => {},
  setJustSignedUp: () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth as any);
  const [extendedUser, setExtendedUser] = useState<User | null>(null);
  const pathname = usePathname();
  const [justSignedUp, setJustSignedUp] = useState(false);
  const { push } = useRouter();

  const authenticatedRoutes = ["/dashboard", "/dashboard/:id"]; // Add more routes as needed

  const isAuthRoute = (): boolean => {
    const authRoutes = [
      "/auth/sign-up",
      "/auth/sign-in",
      "/auth/reset-password",
    ];
    return authRoutes.some((route) => pathname.includes(route));
  };

  const isDashboardRoute = (): boolean => {
    return authenticatedRoutes.some((route) => pathname.includes(route));
  };

  const shouldRedirect = (): boolean => {
    return (
      (user &&
        !justSignedUp &&
        !isDashboardRoute() &&
        !pathname.includes("/auth/reset-password")) ||
      (!user && !isAuthRoute())
    );
  };

  const redirectTo = (): void => {
    const destination = user && !justSignedUp ? "/dashboard" : "/auth/sign-in";
    push(destination);
  };

  useEffect(() => {
    if (!loading && shouldRedirect()) {
      redirectTo();
    }
  }, [user, loading, justSignedUp]);

  useEffect(() => {
    const fetchUserAndLikedProducts = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const likedProducts = userData.likedProducts || [];
          const cart = userData.cart || [];
          setExtendedUser({ uid: user.uid, likedProducts, cart });
        }
      }
    };

    fetchUserAndLikedProducts();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: extendedUser,
        loading,
        setExtendedUser,
        setJustSignedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
