import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignupForm } from "./styles";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";


const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = ({ target }) =>{
        setEmail(target.value)
    }

    const onChangeName = ({ target }) =>{
        setName(target.value)
    }

    const onChangePassword = ({ target }) =>{
        setPassword(target.value)
    }
    const executeRequest = () =>{
        const body = {
            name,
            email,
            password
        }

        axios
            .post(`${BASE_URL}/user/signup`, body)
            .then((res) => {console.log(res)})
            .catch((error) => {console.log(error.response.data)})
        
    }

    return(
        <section>
            <PageTitle title={"Signup"}/>
            <SignupForm>
                <TextField id="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={onChangeName} 
                type='text'
                />
                
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
                onClick={executeRequest}
                >Submit</Button>
            </SignupForm>
        </section>
    )
}

export default Signup