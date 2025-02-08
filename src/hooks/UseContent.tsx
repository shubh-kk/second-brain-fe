import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    //fetch the contents
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setContents(response.data.content)
        })
    }
    //when new content added then call function for refetch the contents || when re render/ 
    useEffect(() => { 
        let interval = setInterval(() => {
            refresh() ;
        }, 1000 * 10)

        return () => {
            clearInterval(interval)
        }
    }, [])
    return {contents, refresh} ;
}