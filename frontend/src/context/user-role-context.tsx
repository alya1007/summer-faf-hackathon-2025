import { createContext } from "react";

interface UserRoleContextProps {
  userRole: string;
  setUserRole: (userRole: string) => void;
  userCredentials: string;
  setUserCredentials: (userCreds: string) => void;
}

export const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);