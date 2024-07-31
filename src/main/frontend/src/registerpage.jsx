import React, { useState } from 'react';
import styles from './registerpage.css'


function RegisterPage(props) {


    const [ID, setID] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Sex, setSex] = useState("");

    const onIDHandler = (event) => {
        setID(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSexHandler = (event) => {
        setSex(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        let body = {
            id: ID,
            name: Name,
            password: Password,
            confirmPassword: ConfirmPassword,
        }


    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh', backgroundColor : "#868E96"
        }}>
            <form style={{display: 'flex', flexDirection: 'column', backgroundColor:"#E9ECEF",alignItems:'center',justifyContent:'center', width:'80%',height: '80vh',borderRadius:'30px'}}
                  onSubmit={onSubmitHandler}
            >


                <input type='text' value={Name} name="name" className="registerinput" onChange={onNameHandler} placeholder="성명"/>
                <input type='text' value={ID} name="username" className="registerinput" onChange={onIDHandler} placeholder="아이디"/>
                <input type='password' value={Password} name="password" className="registerinput" onChange={onPasswordHandler}
                       placeholder="비밀번호"/>
                <input type='password' value={ConfirmPassword} className="registerinput" name="confirmpassword"
                       onChange={onConfirmPasswordHandler} placeholder="비밀번호 확인"/>
                <select id="sex" onChange={onSexHandler}>
                    <option name="sex" value="MALE">남자</option>
                    <option name="sex" value="FEMALE">여자</option>
                </select>
                <br/>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;
