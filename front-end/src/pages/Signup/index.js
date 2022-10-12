import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignupForm } from "./styles";
import PageTitle from "../../components/PageTitle";


const Signup = () => {
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const onChangeEmail = ({ target }) =>{
        setEmail(target.value)
    }

    const onChangeName = ({ target }) =>{
        setName(target.value)
    }

    const onChangePassword = ({ target }) =>{
        setPassword(target.value)
    }
    const onSubmitSignup = ({ targe }) =>{

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
                onClick={onSubmitSignup}
                >Submit</Button>
            </SignupForm>
        </section>
    )
}

export default Signup