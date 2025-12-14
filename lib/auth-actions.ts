import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { supabase } from "./supabase";

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign-in...");
    const provider = new GoogleAuthProvider();

    console.log("Calling signInWithPopup...");
    const result = await signInWithPopup(auth, provider);
    console.log("signInWithPopup successful:", result);

    const user = result.user;
    console.log("Firebase user:", {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData,
    });

    // Upsert user to Supabase
    console.log("Upserting user to Supabase...");
    try {
      await upsertUserToSupabase(user);
      console.log("User upserted successfully");
    } catch (upsertError) {
      console.error(
        "Failed to upsert user to Supabase, but continuing with auth:",
        upsertError
      );
      // Don't throw the error here - let the user sign in even if Supabase fails
    }

    return user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      customData: error.customData,
    });
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Upsert user to Supabase
    await upsertUserToSupabase(user);

    return user;
  } catch (error: any) {
    console.error("Error signing up with email:", error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Upsert user to Supabase
    await upsertUserToSupabase(user);

    return user;
  } catch (error: any) {
    console.error("Error signing in with email:", error);

    // Check if the error is due to user not found
    if (error.code === "auth/user-not-found") {
      throw new Error("User not found. Please register first.");
    }

    // Check if the error is due to wrong password
    if (error.code === "auth/wrong-password") {
      throw new Error("Invalid password. Please try again.");
    }

    // For other errors, provide a more user-friendly message
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Helper function to upsert user to Supabase
const upsertUserToSupabase = async (user: any) => {
  try {
    const { uid, email, photoURL, providerData } = user;

    // Get provider from providerData if available
    const provider = providerData?.[0]?.providerId || "password";

    console.log("Upserting user to Supabase:", {
      id: uid,
      email: email,
      provider: provider,
      photo_url: photoURL || null,
    });

    // Upsert user to Supabase users table
    const { data, error } = await supabase
      .from("users")
      .upsert({
        id: uid,
        email: email,
        provider: provider,
        photo_url: photoURL || null,
      })
      .select();

    if (error) {
      console.error("Error upserting user to Supabase:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    console.log("User upserted successfully:", data);
    return data;
  } catch (error) {
    console.error("Exception in upsertUserToSupabase:", error);
    throw error;
  }
};
