import { useSetRecoilState } from "recoil";
import { securityQuestionsState } from "../state/securityQuestions";
import axios from "axios";
import { set } from "lodash";

export const useSecurityQuestionsAction = () => {
    const setSecurityQuestions = useSetRecoilState(securityQuestionsState);
  const baseUrl = "/api/users.php";

  const getSecurityQuestions = async () => {
    const response = await axios.post(baseUrl, {
       endpoint:"get-questions" 
    });
      const { data } = response;
    if (!data.error) {
        setSecurityQuestions(() => data.data.questions);
    //   return data.data.questions;
    } else {
      throw new Error(data.data.msg);
    }
  }

  return {getSecurityQuestions}
}