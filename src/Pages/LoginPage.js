import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import dictionary from "../Data-Containers/Dictionary.json"
import {useState} from "react";

export default function LoginPage() {
    
    let dispatch = useDispatch();
    let nav = useNavigate();
    let lang = useSelector((state) => state.appState.selectedLanguage);
    let [message, setMessage] = useState(null);
    const onFormSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        if (data.get("pass") == "admin" && data.get("login")!=null && data.get("login") != "") {
            dispatch({type: "loginuser", user:data.get("login")});
            nav("/");
        } else {
            setMessage(dictionary[lang].LoginPage.loginErr);
            setTimeout(()=> setMessage(null), 2000);
        }
    }
    
    return <div>
        <h1>{dictionary[lang].LoginPage.hdg}</h1>
        <form onSubmit={onFormSubmit} >
            <input type="text" placeholder="Login" name="login"/>
            <br/>
            <br/>
            <input type="password" placeholder={dictionary[lang].LoginPage.password} name="pass"/>
            <br/>
            <br/>
            <input type="submit" value={dictionary[lang].LoginPage.btnPlaceholder}/>
            <br/>
            <br/>
            <span style={{fontWeight: "800"}}>{message??""}</span>
        </form>
    </div>
}