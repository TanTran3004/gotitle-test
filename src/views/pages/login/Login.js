import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AuthService from "src/services/auth.service";
const Login = () => {
  const History = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const checkLogin = () => {
    const token = !!localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    const admin = localStorage.getItem("role");
    if (token && admin) {
      Redirect("/list-users");
    } else {
      Redirect("/login");
    }
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  useEffect(() => {}, []);
  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password)
      .then((res) => {
        // console.log(res.data);
        if (res.data.token !== undefined) {
          localStorage.setItem("token", res.data.token);
          alert("Success!!");
          History.push("/list-users");
          window.location.reload();
        } else {
          alert("Oops! Fails");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Oops! Fails");
      });
    setUsername("");
    setPassword("");
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1> Login </h1>{" "}
                    <p className="text-muted"> Sign In to your account </p>{" "}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>{" "}
                      </CInputGroupPrepend>{" "}
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={onChangeUsername}
                      />{" "}
                    </CInputGroup>{" "}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>{" "}
                      </CInputGroupPrepend>{" "}
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChangePassword}
                      />{" "}
                    </CInputGroup>{" "}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">
                          Login{" "}
                        </CButton>{" "}
                      </CCol>{" "}
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password ?
                        </CButton>{" "}
                      </CCol>{" "}
                    </CRow>{" "}
                  </CForm>{" "}
                </CCardBody>{" "}
              </CCard>{" "}
            </CCardGroup>{" "}
          </CCol>{" "}
        </CRow>{" "}
      </CContainer>{" "}
    </div>
  );
};

export default Login;
