import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";

import logo from "../Images/home-logo.svg";
import search from "../Images/search-icon.svg";
import image1 from "../Images/nav-home.svg"
import image2 from "../Images/nav-jobs.svg"
import image3 from "../Images/nav-messaging.svg"
import image4 from "../Images/nav-network.svg"
import image5 from "../Images/nav-work.svg"
import image6 from "../Images/nav-notifications.svg"
import userImage from '../Images/user.svg'
import downImage from '../Images/down-icon.svg'
import {signOutAPI} from "../redux/actions/index.js";

const HeaderHome = (props)=> {

  if (props.user)
    console.log(props.user)
  else
    console.log(props.user)

  console.log('https://lh3.googleusercontent.com/a/AGNmyxbFOi_uUtzSeI-_cBmTFbs6iUzVzhqhY-TmKTX2=s96-c')

  return (
    <Container>
      <Content>
        <Logo>
          <a href='/home'>
            <img src={logo} alt="logo"/>
          </a>
        </Logo>
        <Search>
          <div>
            <input type='text' placeholder='Search'/>
              <SearchIcon>
                <img src={search} alt='search'/>
              </SearchIcon>
          </div>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src={image1} alt="" />
                <span>Home</span>
              </a>
            </NavList>
              <NavList>
                <a>
                  <img src={image4} alt="" />
                  <span>My Network</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src={image2} alt="" />
                  <span>Jobs</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src={image3} alt="" />
                  <span>Messaging</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src={image6} alt="" />
                  <span>Notifications</span>
                </a>
              </NavList>
              <User>
                <a>
                  {
                    props.user && props.user.photoURL ? (<img src={props.user.photoURL} alt=''/>)
                      : (<img src={userImage} alt="" />)
                  }
                  <span>Me<img src={downImage} alt="" /></span>
                </a>
                <SignOut onClick={() => props.signOut()}>
                  <a>Sign Out</a>
                </SignOut>
              </User>
              <Work>
                <a>
                  <img src={image5} alt="" />
                  <span>Work<img src={downImage} alt="" /></span>
                </a>
              </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
    )
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  @media (max-width: 767px) {
    padding: 15px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
`;
const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;
const SignOut = styled(NavList)`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  @media (max-width: 767px) {
    position: absolute;
    top: -45px;
    right: 15px;
    background: #eee;
  }
`;
const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
    margin-top: 3px;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  span {
    margin-top: 3px;
  }
  @media (max-width: 575px) {
    display: none;
  }
`;

const mapStateToProps = (state)=> {
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        signOut: ()=> dispatch(signOutAPI()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);