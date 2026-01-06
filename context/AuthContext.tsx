"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Book } from "@/app/lib/types";
import type { User as FirebaseUser } from "firebase/auth";
// import type { User as DbUser } from "../../lib/db-types"; // your Prisma User type
import type {User as DbUser} from "@/app/lib/db-types"




// ✅ Define context type
type AuthContextType = {
  // user: User | null;

  user: FirebaseUser | null;   // Firebase Auth user
  dbUser: DbUser | null;       // Prisma user
  loading: boolean;



  authReady: boolean;
  showModal: boolean;
  showModal2: boolean;
  setShowModal2: (show: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<string | null>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<string | null>;
  isLoggedIn: boolean;
  library: Book[] | null;
  toggleBook: (book: Book) => void;
  setLibrary: React.Dispatch<React.SetStateAction<Book[] | null>>;
  increaseFont:() => void;
  decreaseFont:() => void;
  fontSize:number;
};

// ✅ Create context
// const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
 



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [library, setLibrary] = useState<Book[] | null>(null);
  const [fontSize, setFontSize] = useState(16);

  const [dbUser, setDbUser] = useState<DbUser | null>(null);
const [loading, setLoading] = useState(true);



  // ✅ Ensure user exists in DB
  const ensureUser = async (currentUser: User) => {
    try {
      const token = await currentUser.getIdToken();
      await fetch("/api/user", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Failed to ensure user:", error.message);
      else console.error("Unknown error ensuring user:", error);
    }
  };

  // 🔐 Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (currentUser) await ensureUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // 🔹 Load library after authReady
  useEffect(() => {
    if (!authReady || !user) return;

    let cancelled = false;

    const loadLibrary = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/library", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Safely parse JSON
        const text = await res.text();
        const data: Book[] = text ? JSON.parse(text) : [];
        if (!cancelled) setLibrary(data);
      } catch  {
        if (!cancelled) setLibrary([]);
      }
    };

    loadLibrary();

    return () => {
      cancelled = true;
    };
  }, [authReady, user]);

  // ✅ Functions
  const openAuthModal = () => setShowModal(true);
  const closeAuthModal = () => setShowModal(false);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await ensureUser(credential.user);
      setShowModal(false);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) return error.message;
      return "Something went wrong";
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await ensureUser(result.user);
      setShowModal(false);
    } catch (error: unknown) {
      console.error("Google login error:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  const forgotPassword = async (email: string): Promise<string | null> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) return error.message;
      return "Failed to send reset email";
    }
  };

  // ✅ Fully safe toggleBook
const toggleBook = async (book: Book) => {
  if (!user) return;

  const prevLibrary = library || [];
  const exists = prevLibrary.some((b) => b.id === book.id);

  // Optimistic update
  setLibrary(exists ? prevLibrary.filter((b) => b.id !== book.id) : [...prevLibrary, book]);

  try {
    const token = await user.getIdToken();
    const res = await fetch("/api/library/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ book }),
    });

    let result: { ok?: boolean; error?: string } = { ok: false };
    const text = await res.text();
    if (text) result = JSON.parse(text);

    if (!res.ok || result.error) {
      console.error("Toggle book failed:", result.error || result);
      setLibrary(prevLibrary); // revert optimistic update
    }
  } catch (error: unknown) {
    console.error("Toggle book error:", error);
    setLibrary(prevLibrary); // revert
  }
};


const increaseFont = () => {
    setFontSize((prev) => Math.min(prev + 2, 22));
  };

const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, 14));
  };



//add-start

useEffect(() => {
  if (!authReady || !user) {
    setDbUser(null);
    setLoading(false);
    return;
  }

  let cancelled = false;

  const loadDbUser = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch db user");

      const data = await res.json();
      if (!cancelled) setDbUser(data);
    } catch (err) {
      console.error("DB user fetch failed", err);
      if (!cancelled) setDbUser(null);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  loadDbUser();

  return () => {
    cancelled = true;
  };
}, [authReady, user]);

//added-finish line

























  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        showModal,
        showModal2,
        setShowModal2,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        logout,
        forgotPassword,
        isLoggedIn: !!user,
        toggleBook,
        setLibrary,
        library,
        increaseFont,
        decreaseFont,
       fontSize,
       dbUser,
       loading,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};





















// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { Book } from "@/app/lib/types";

// // ✅ Define the context type
// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   showModal2: boolean;
//   setShowModal2: (show: boolean) => void;
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   login: (email: string, password: string) => Promise<string | null>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<string | null>;
//   isLoggedIn: boolean;
//   library: Book[] | null;
//   toggleBook: (book: Book) => void;
//   setLibrary: React.Dispatch<React.SetStateAction<Book[] | null>>;
// };

// // ✅ Create the context
// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showModal2, setShowModal2] = useState<boolean>(false);
//   const [library, setLibrary] = useState<Book[] | null>(null);

// // ✅ Ensure user exists in DB
// const ensureUser = async (currentUser: User) => {
//   try {
//     const token = await currentUser.getIdToken();
//     await fetch("/api/user", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error)
//       console.error("Failed to ensure user:", error.message);
//     else console.error("Unknown error ensuring user:", error);
//   }
// };


// // 🔐 Listen to Firebase auth state
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//     setUser(currentUser);
//     setAuthReady(true);

//     // ✅ Moved ensureUser above useEffect
//     if (currentUser) await ensureUser(currentUser);
//   });

//   return unsubscribe;
// }, []);







  // 🔐 Listen to Firebase auth state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);
  //     setAuthReady(true);

  //     // Ensure user exists in DB
  //     if (currentUser) await ensureUser(currentUser);
  //   });

  //   return unsubscribe;
  // }, []);

  // 🔹 Load library after authReady
//   useEffect(() => {
//     if (!authReady || !user) return;

//     let cancelled = false;

//     const loadLibrary = async () => {
//       try {
//         const token = await user.getIdToken();
//         const res = await fetch("/api/library", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data: Book[] = await res.json();
//         if (!cancelled) setLibrary(data);
//       } catch (error: unknown) {
//   console.error("Failed to load library:", error);
//   if (!cancelled) setLibrary([]);
// }
//     };

//     loadLibrary();

//     return () => {
//       cancelled = true;
//     };
  // }, [authReady, user]);

  // ✅ Ensure user exists in DB
  // const ensureUser = async (currentUser: User) => {
  //   try {
  //     const token = await currentUser.getIdToken();
  //     await fetch("/api/user", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error: unknown) {
  //     if (error instanceof Error)
  //       console.error("Failed to ensure user:", error.message);
  //     else console.error("Unknown error ensuring user:", error);
  //   }
  // };









  // ✅ Functions with explicit return types
//   const openAuthModal = (): void => setShowModal(true);
//   const closeAuthModal = (): void => setShowModal(false);

//   const login = async (
//     email: string,
//     password: string
//   ): Promise<string | null> => {
//     try {
//       const credential = await signInWithEmailAndPassword(auth, email, password);
//       const currentUser = credential.user;
//       await ensureUser(currentUser);
//       setShowModal(false);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Something went wrong";
//     }
//   };

//   const loginWithGoogle = async (): Promise<void> => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const currentUser = result.user;
//       await ensureUser(currentUser);
//       setShowModal(false);
//     } catch (error: unknown) {
//       if (error instanceof Error) console.error("Google login error:", error.message);
//       else console.error("Unknown Google login error:", error);
//     }
//   };

//   const logout = async (): Promise<void> => {
//     await signOut(auth);
//     router.replace("/");
//   };

//   const forgotPassword = async (email: string): Promise<string | null> => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Failed to send reset email";
//     }
//   };

//   // ✅ Optimistic toggleBook function
//   const toggleBook = async (book: Book) => {
//     if (!user) return;

//     if (!library) setLibrary([book]); // first book
//     else {
//       const exists = library.some((b) => b.id === book.id);
//       // Optimistic UI update
//       setLibrary((prev) =>
//         prev
//           ? exists
//             ? prev.filter((b) => b.id !== book.id)
//             : [...prev, book]
//           : [book]
//       );
//     }

//     try {
//       const token = await user.getIdToken();
//            const res = await fetch("/api/library/toggle", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({ book }),
// });

// // Only parse JSON if there is content
// let result: any = null;
// const text = await res.text();
// if (text) result = JSON.parse(text);

// if (!res.ok) {
//   console.error("Toggle book failed:", result);
//   // Revert optimistic update
//   setLibrary((prev) =>
//     prev
//       ? prev.some((b) => b.id === book.id)
//         ? prev.filter((b) => b.id !== book.id)
//         : [...prev, book]
//       : [book]



//       // const res = await fetch("/api/library/toggle", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       //   body: JSON.stringify({ book }),
//       // });

//       // const result = await res.json();
//       // if (!res.ok) {
//       //   console.error("Toggle book failed:", result);
//       //   // Revert optimistic update
//       //   setLibrary((prev) =>
//       //     prev
//       //       ? prev.some((b) => b.id === book.id)
//       //         ? prev.filter((b) => b.id !== book.id)
//       //         : [...prev, book]
//       //       : [book]
//         );
//       }
//     } catch (error: unknown) {
//       console.error("Error toggling book:", error);
//       // Revert optimistic update
//       setLibrary((prev) =>
//         prev
//           ? prev.some((b) => b.id === book.id)
//             ? prev.filter((b) => b.id !== book.id)
//             : [...prev, book]
//           : [book]
//       );
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         showModal2,
//         setShowModal2,
//         openAuthModal,
//         closeAuthModal,
//         login,
//         loginWithGoogle,
//         logout,
//         forgotPassword,
//         isLoggedIn: !!user,
//         toggleBook,
//         setLibrary,
//         library,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };


















// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { Book } from "@/app/lib/types";

// // ✅ Define the context type
// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   showModal2: boolean;
//   setShowModal2: (show: boolean) => void;
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   login: (email: string, password: string) => Promise<string | null>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<string | null>;
//   isLoggedIn: boolean;
//   library: Book[] | null;
//   toggleBook: (book: Book) => void;
//   setLibrary: React.Dispatch<React.SetStateAction<Book[] | null>>;
// };

// // ✅ Create the context
// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showModal2, setShowModal2] = useState<boolean>(false);
//   const [library, setLibrary] = useState<Book[] | null>(null);

//   // 🔐 Listen to Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthReady(true);
//     });
//     return unsubscribe;
//   }, []);

//   // 🔹 Load library after authReady
//   useEffect(() => {
//     if (!authReady || !user) return;

//     let cancelled = false;

//     const loadLibrary = async () => {
//       try {
//         const token = await user.getIdToken();
//         const res = await fetch("/api/library", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (!cancelled) setLibrary(data);
//       } catch (error: unknown) {
//         if (!cancelled) setLibrary([]);
//       }
//     };

//     loadLibrary();

//     return () => {
//       cancelled = true;
//     };
//   }, [authReady, user]);

//   // ✅ Ensure user exists in DB
//   const ensureUser = async (currentUser: User) => {
//     try {
//       const token = await currentUser.getIdToken();
//       await fetch("/api/user", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } catch (error: unknown) {
//       if (error instanceof Error) console.error("Failed to ensure user:", error.message);
//       else console.error("Unknown error ensuring user:", error);
//     }
//   };

//   // ✅ Functions with explicit return types
//   const openAuthModal = (): void => setShowModal(true);
//   const closeAuthModal = (): void => setShowModal(false);

//   const login = async (
//     email: string,
//     password: string
//   ): Promise<string | null> => {
//     try {
//       const credential = await signInWithEmailAndPassword(auth, email, password);
//       const currentUser = credential.user;
//       await ensureUser(currentUser);
//       setShowModal(false);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Something went wrong";
//     }
//   };

//   const loginWithGoogle = async (): Promise<void> => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const currentUser = result.user;
//       await ensureUser(currentUser);
//       setShowModal(false);
//     } catch (error: unknown) {
//       if (error instanceof Error) console.error("Google login error:", error.message);
//       else console.error("Unknown Google login error:", error);
//     }
//   };

//   const logout = async (): Promise<void> => {
//     await signOut(auth);
//     router.replace("/");
//   };

//   const forgotPassword = async (email: string): Promise<string | null> => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Failed to send reset email";
//     }
//   };

//   const toggleBook = async (book: Book) => {
//     if (!user || !library) return;

//     setLibrary((prev) =>
//       prev!.some((b) => b.id === book.id)
//         ? prev!.filter((b) => b.id !== book.id)
//         : [...prev!, book]
//     );

//     try {
//       const token = await user.getIdToken();
//       await fetch("/api/library/toggle", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ book }),
//       });
//     } catch (error: unknown) {
//       if (error instanceof Error) console.error("Toggle book error:", error.message);
//       else console.error("Unknown toggle book error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         showModal2,
//         setShowModal2,
//         openAuthModal,
//         closeAuthModal,
//         login,
//         loginWithGoogle,
//         logout,
//         forgotPassword,
//         isLoggedIn: !!user,
//         toggleBook,
//         setLibrary,
//         library,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };









// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { Book } from "@/app/lib/types";
// // ✅ Define the context type
// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   showModal2: boolean;
//   setShowModal2: (show: boolean) => void;
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   login: (email: string, password: string) => Promise<string | null>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<string | null>;
//   isLoggedIn: boolean;
//   library: Book[] | null;
//   toggleBook: (book: Book) => void;
//   setLibrary: React.Dispatch<React.SetStateAction<Book[] | null>>;
// };

// // ✅ Create the context
// const AuthContext = createContext<AuthContextType | null>(null);

// // ✅ Provider component
// // export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showModal2, setShowModal2] = useState<boolean>(false);
//   const [library, setLibrary] = useState<Book[] | null>(null);

//   // 🔐 Listen to Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthReady(true);
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (!authReady || !user) return;

//     let cancelled = false;

//     const loadLibrary = async () => {
//       try {
//         const token = await user.getIdToken();
//         const res = await fetch("/api/library", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!cancelled) setLibrary(data);
//       } catch (e) {
//         if (!cancelled) setLibrary([]);
//       }
//     };

//     loadLibrary();

//     return () => {
//       cancelled = true;
//     };
//   }, [authReady, user]);

//   // ✅ Functions with explicit return types
//   const openAuthModal = (): void => setShowModal(true);
//   const closeAuthModal = (): void => setShowModal(false);

//   const login = async (
//     email: string,
//     password: string
//   ): Promise<string | null> => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setShowModal(false);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Something went wrong";
//     }
//   };

//   const loginWithGoogle = async (): Promise<void> => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//     setShowModal(false);
//   };

//   const logout = async (): Promise<void> => {
//     await signOut(auth);
//     router.replace("/");
//   };

//   const forgotPassword = async (email: string): Promise<string | null> => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Failed to send reset email";
//     }
//   };

//   const toggleBook = async (book: Book) => {
//     if (!user || !library) return;

//     setLibrary((prev) =>
//       prev!.some((b) => b.id === book.id)
//         ? prev!.filter((b) => b.id !== book.id)
//         : [...prev!, book]
//     );

//     const token = await user.getIdToken();

//     await fetch("/api/library/toggle", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ book }),
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         showModal2,
//         setShowModal2,
//         openAuthModal,
//         closeAuthModal,
//         login,
//         loginWithGoogle,
//         logout,
//         forgotPassword,
//         isLoggedIn: !!user,
//         toggleBook,
//         setLibrary,
//         library,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };










// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { Book } from "@/app/lib/types";
// // ✅ Define the context type
// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   showModal2: boolean;
//   setShowModal2: (show: boolean) => void;
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   login: (email: string, password: string) => Promise<string | null>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<string | null>;
//   isLoggedIn: boolean;

// };

// // ✅ Create the context
// const AuthContext = createContext<AuthContextType | null>(null);

// // ✅ Provider component
// // export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
//  export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showModal2, setShowModal2] = useState<boolean>(false);

//   // 🔐 Listen to Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthReady(true);
//     });

//     return unsubscribe;

//   }, []);

//   // ✅ Functions with explicit return types
//   const openAuthModal = (): void => setShowModal(true);
//   const closeAuthModal = (): void => setShowModal(false);

//   const login = async (email: string, password: string): Promise<string | null> => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setShowModal(false);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Something went wrong";
//     }
//   };

//   const loginWithGoogle = async (): Promise<void> => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//     setShowModal(false);
//   };

//   const logout = async (): Promise<void> => {
//     await signOut(auth);
//     router.replace("/");
//   };

//   const forgotPassword = async (email: string): Promise<string | null> => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Failed to send reset email";
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         showModal2,
//         setShowModal2,
//         openAuthModal,
//         closeAuthModal,
//         login,
//         loginWithGoogle,
//         logout,
//         forgotPassword,
//         isLoggedIn: !!user,

//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode,  } from "react";
// import {
//     signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//    sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";
//  import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";

// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   showModal2: boolean;
//   setShowModal2:function (show: boolean) => void; // function, not boolean
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   login: (email: string, password: string) => Promise<string | null>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<string | null>;
//   isLoggedIn: boolean;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const {showModal2, setShowModal2 } = useState(false);
//   const router = useRouter();

//   // 🔐 SINGLE source of truth
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthReady(true);
//     });

//     return unsubscribe;
//   }, []);

//   const loginWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//     setShowModal(false);
//   };

// const login = async (email: string, password: string) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setShowModal(false);
//       // router.replace("/for-you");
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Something went wrong";
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);
//     router.replace("/");

//     // ❌ DO NOT manually set user here
//     // onAuthStateChanged will fire automatically
//   };

// const forgotPassword = async (email: string) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return null;
//     } catch (error) {
//       if (error instanceof FirebaseError) return error.message;
//       return "Failed to send reset email";
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         openAuthModal: () => setShowModal(true),
//         closeAuthModal: () => setShowModal(false),
//         loginWithGoogle,
//          forgotPassword,
//          login,
//         logout,
//         isLoggedIn: !!user,
//         showModal2,
//         setShowModal2,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext)!;

// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";
// import { auth } from "@/app/lib/firebase";

// type AuthContextType = {
//   user: User | null;
//   authReady: boolean;
//   showModal: boolean;
//   openAuthModal: () => void;
//   closeAuthModal: () => void;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => void;
//   isLoggedIn: boolean;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [authReady, setAuthReady] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthReady(true);
//     });
//     return unsubscribe;
//   }, []);

//   const loginWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//     setShowModal(false);
//   };

//   const logout = async () => {
//     await signOut(auth);
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authReady,
//         showModal,
//         openAuthModal: () => setShowModal(true),
//         closeAuthModal: () => setShowModal(false),
//         loginWithGoogle,
//         logout,
//         isLoggedIn: !!user,

//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext)!;
