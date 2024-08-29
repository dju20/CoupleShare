import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import 합니다
import styles from '../css/registerpage.css';
import Header from "./header";

function RegisterPage(props) {
    const [ID, setID] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Sex, setSex] = useState("MALE"); // 기본 값을 "MALE"로 설정
    const [Email, setEmail] = useState("");

    const navigate = useNavigate(); // useNavigate 훅 사용

    const onIDHandler = (event) => {
        setID(event.currentTarget.value);
    };
    const onEMAILHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };
    const onSexHandler = (event) => {
        setSex(event.currentTarget.value);
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }

        let body = {
            username: ID,
            realName: Name,
            password: Password,
            email : Email,
            sex: Sex
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                navigate('/login'); // 로그인 페이지로 리디렉션
            } else {
                throw new Error('Registration request failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.'); // 실패 시 경고창 띄움
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100vh',
            height: '100vh', backgroundColor: "#868E96"
        }}>
            <Header/>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "#E9ECEF",
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                height: '80vh',
                borderRadius: '30px'
            }}
                  onSubmit={onSubmitHandler}
            >
                <input type='text' value={Name} name="realName" className="registerinput" onChange={onNameHandler}
                       placeholder="성명"/>
                <input type='email' value={Email} name="email" className="registerinput" onChange={onEMAILHandler}
                       placeholder="이메일"/>
                <input type='text' value={ID} name="username" className="registerinput" onChange={onIDHandler}
                       placeholder="아이디"/>
                <input type='password' value={Password} name="password" className="registerinput"
                       onChange={onPasswordHandler}
                       placeholder="비밀번호"/>
                <input type='password' value={ConfirmPassword} className="registerinput" name="confirmpassword"
                       onChange={onConfirmPasswordHandler} placeholder="비밀번호 확인"/>
                <ul>
                    <li>
                        <input type="radio" name="sex" value="MALE" onChange={onSexHandler}></input>남자
                        <input type="radio" name="sex" value="FEMALE" onChange={onSexHandler}></input>여자
                    </li>
                </ul>

    <br/>
    <button className="registerbtn" type="submit">
        회원가입
    </button>
</form>
</div>
)
}

export default RegisterPage;
