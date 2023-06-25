import axios from "axios";

export async function fetchNRelease({url,body}){
        const response = await axios.post(url,body);
        const {data} = response;
        if(!data.error){
            return data.data;
        }else{
            throw new Error(result.data.msg);
        }    
}