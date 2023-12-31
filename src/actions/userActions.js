import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";
import { userAtom } from "../state/user";

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

  const _register = async ({ name, email, password, endpoint = "signup" },selectedQuestions) => {
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


  const register = async({name,email,password},selectedQuestions) => {
    const registrationPromise = axios.post(baseUrl, {
      name,
      email,
      password,
      endpoint:"signup"
    });

    const questionsPromise = axios.post(baseUrl, {
      endpoint:"set-questions",
      email,
      question_1:selectedQuestions[0].question,
      answer_1:selectedQuestions[0].answer,
      question_2:selectedQuestions[1].question,
      answer_2:selectedQuestions[1].answer,
    });

    const [registrationResponse,questionsResponse] = await Promise.all([registrationPromise,questionsPromise]);

     // Check if both requests were successful
    if (!registrationResponse.data.error && !questionsResponse.data.error) {
      const user = registrationResponse.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
    } else {
      // Handle errors if either request fails
      if (registrationResponse.data.error) {
        throw new Error(`RegistrationError : ${registrationResponse.data.data.msg}`);
      } else {
        throw new Error(`QuestionsError : ${questionsResponse.data.data.msg}`);
      }
    }
  }



  const logout = (navigate) => {
    localStorage.removeItem("user");
    navigate("/auth");
    setAuth(null);
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
