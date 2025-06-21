// interface UserRoleContextProviderProps {
//   children: ReactNode;
// }

// export const UserRoleContextProvider = ({
//   children,
// }: UserRoleContextProviderProps) => {
//   const authService: AuthService = new AuthService();

//   const [userCredentials, setUserCredentials] = useState<string>("");
//   const [userRole, setUserRole] = useState<string>("");

//   useEffect(() => {
//     const token = localStorage.getItem("access-token") || "";

//     const userCreds = authService.getUserCredentialsFromToken(token);
//     const role = authService.getUserRoleFromToken(token);

//     setUserCredentials(userCreds);
//     setUserRole(role);
//   }, [authService]);

//   return (
//     <UserRoleContext.Provider
//       value={{ userRole, setUserRole, userCredentials, setUserCredentials }}
//     >
//       {children}
//     </UserRoleContext.Provider>
//   );
// };