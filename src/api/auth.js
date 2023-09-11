import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { authService } from "@/services/AuthService";

const auth = getAuth();

export const register = async ({ email, password, name }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw new Error(err);
  }
};

export const authObserver = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      authService.user = user;
    } else {
      authService.user = null;
    }
  });
};
