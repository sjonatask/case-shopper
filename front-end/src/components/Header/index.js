import React from "react";
import { HeaderContainer } from "./styles";

const Header = () => {
    return <>
        <HeaderContainer>
            <div>
                <a href="http://localhost:3000/admin">admin</a>
            </div>
            <div>
                <a href="http://localhost:3000/login">login | </a>
                <a href="http://localhost:3000/signup">Signup</a>
            </div>
        </HeaderContainer>
    </>
}

export default Header