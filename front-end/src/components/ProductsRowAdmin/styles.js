import styled from "styled-components"

export const ProductList = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2px
    width: 65%;
    height: 20%;
`

export const RowList = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%
    max-height: 70%

    button{
        margin: 10px;
        align-self: center;
        width: 50%
        cursor: pointer;
    }
`