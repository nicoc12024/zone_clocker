import { createContext, useState, useEffect, ReactNode } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface User {
  id: number;
  name: string;
  email: string;
  userType: string; // 'admin' or 'employee'
  id_zone?: number | null;
}

interface AuthContextProps {
  currentUser: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  userRole: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface Credentials {
  email?: string;
  password?: string;
  id_number?: number | "";
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string>(
    localStorage.getItem("userRole") || ""
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    makeRequest
      .get("/auth/validate-jwt-on-refresh-page")
      .then((res) => {
        setCurrentUser({
          id: res.data.id_employee || res.data.id_admin,
          name: res.data.name,
          email: res.data.email,
          userType: res.data.userType,
          id_zone: res.data.id_zone || null,
        });
        if (res.data.userType) {
          setUserRole(localStorage.getItem("userRole") || "");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials: Credentials) => {
    let response;
    let role;
    let userData;

    if ("id_number" in credentials) {
      response = await makeRequest.post("/auth/login-employee", credentials);
      role = "employee";
      userData = {
        id: response.data.id_employee,
        name: response.data.name,
        email: response.data.email || "",
        userType: role,
        id_zone: response.data.id_zone || null,
      };
    } else {
      response = await makeRequest.post("/auth/login", credentials);
      role = "admin";

      userData = {
        id: response.data.id_admin,
        name: response.data.name,
        email: response.data.email,
        userType: role,
      };
    }

    if (userData && userData.id) {
      setCurrentUser(userData);
      localStorage.setItem("userRole", role);
      setUserRole(role);
    }
  };

  const logout = async () => {
    await makeRequest.post("/auth/logout", {});
    setCurrentUser(null);
    setUserRole("");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
