import { useRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";
import { userAtom } from "../state/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUserAction = () => {
  const baseUrl = "/api/users.php";
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const login = async ({ email, password, endpoint = "login" }) => {
    const response = await axios.post(baseUrl, {
      email,
      password,
      endpoint,
    });
    const { data } = response;

    if (!data.error) {
      const user = data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
    } else {
      throw new Error(data.data.msg);
    }
  };

  const register = async ({ name, email, password, endpoint = "signup" }) => {
    const response = await axios.post(baseUrl, {
      name,
      email,
      password,
      endpoint,
    });
    const { data } = response;

    if (!data.error) {
      const user = data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
    } else {
      throw new Error(data.data.msg);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/auth");
  };

  const getUserById = async ({id}) => {
    const response = await axios.post(baseUrl, {
      endpoint: "get-user-details",
      id,
    });
    const { data } = response;
    if (!data.error) {
      setUser(() => data.data.details[0]);
      // return data.data;
    } else {
      throw new Error(data.data.msg);
    }
  };

  return { login, register, logout, getUserById };
};

export default useUserAction;
