import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginForm } from "./styles";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = ({ target }) =>{
        setEmail(target.value)
    }

    const onChangePassword = ({ target }) =>{
        setPassword(target.value)
    }
    const executeRequest = async () =>{
        const body = {
            email,
            password
        }

       await axios
            .post(`${BASE_URL}/user/login`, body)
            .then((res) => {
                alert("logado com sucesso")
                localStorage.setItem('token', res.data.token)
            })
            .catch((error) => {alert(error.response.data.error)})

            setEmail('')
            setPassword('')
    }

    return(
        <section>
            <a href="http://localhost:3000/home">Home</a>
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
                variant="contained"
                onClick={executeRequest}
                >Login</Button>
                <div><a href="http://localhost:3000/signup">não tem conta ? Registre-se</a></div>
            </LoginForm>
        </section>
    )
}
export default Login