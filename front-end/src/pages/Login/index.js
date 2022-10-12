import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginForm } from "./styles";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const onChangeEmail = ({ target }) =>{
        setEmail(target.value)
    }
    
    const onChangePassword = ({ target }) =>{
        setPassword(target.value)
    }

    const onSubmitLogin = async (event) =>{
        const body = {
            email: email,
            password: password
        }
        console.log(body);
        await axios
            .post(`${BASE_URL}/user/login`, body)
            .then((response) => {
                console.log(response.data.token)
                window.localStorage.setItem('token', response.data.token)
            })
            .catch((error) => alert(error.message))
    }

    return(
        <section>
            <PageTitle title={"Login"}/>
            <LoginForm>
                <TextField id="email"
                label="E-mail"
                variant="standard"
                value={email}
                onChange={onChangeEmail} 
                type='email'
                />

                <TextField id="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={onChangePassword}
                type='password'
                />

                <Button
                type={"submit"}
                variant="contained"
                onClick={onSubmitLogin}
                >Login</Button>
            </LoginForm>
        </section>
    )
}

export default Login