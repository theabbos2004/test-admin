import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { useNavigate } from "react-router-dom";
  
  const MainContext = createContext();
  const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState();
    const [user, setUser] = useState();
    const [token, setToken] = useState();
  
    const checkUser = useCallback(async () => {
        const token=sessionStorage.getItem("test")
        const user=sessionStorage.getItem("user")
        if(!token && !user) {
          navigate("/auth/login")
        }
        setToken(token)
        setUser(JSON.parse(user))
      }, []);
        
      useEffect(() => {
        checkUser();
      }, []);

    useEffect(() => {
      var time = 0;
      const notInterval = setInterval(() => {
        time++;
        if (time >= 3) {
          setNotification(null);
          clearInterval(notInterval);
        }
      }, 1000);
      return () => {
        clearInterval(notInterval);
      };
    }, [notification]);
  
    const value = {
      notification,
      setNotification,
      user,
      setUser,
      checkUser,
      token
    };
    return (
      <MainContext.Provider value={value}>
        <div
          className={`position-absolute text-dark ${
            notification ? "alert" : "hidden"
          } ${
            notification?.type === "error"
              ? "alert-danger"
              : notification?.type === "success"
              ? "alert-success"
              : ""
          }`}
          style={{zIndex:100, top: "1rem", left: "1rem" }}
          role="alert"
        >
          {notification?.desc}
        </div>
        {children}
      </MainContext.Provider>
    );
  };
  export default AuthProvider;
  export const useMainContext = () => useContext(MainContext);