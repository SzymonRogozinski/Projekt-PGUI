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
        if (data.get("pass") == "admin" && data.get("login") != null && data.get("login") != "") {
            dispatch({type: "loginuser", user: data.get("login")});
            nav("/");
        } else {
            setMessage(dictionary[lang].LoginPage.loginErr);
            setTimeout(() => setMessage(null), 2000);
        }
    }

    return <form onSubmit={onFormSubmit}>
        <div className="login-page-wrapper">
            <h1>{dictionary[lang].LoginPage.hdg}</h1>
            <br/>

            <input type="text" placeholder="Login" name="login"/>
            <br/>
            <input type="password" placeholder={dictionary[lang].LoginPage.password} name="pass"/>
            <br/>
            <input type="submit" value={dictionary[lang].LoginPage.btnPlaceholder}/>
            <br/>
            <span style={{fontWeight: "800"}}>{message ?? ""}</span>
        </div>
    </form>
}