import React, {useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";

import closeI from '../Images/close-icon.svg'
import userI from '../Images/user.svg'
import shareImg from '../Images/share-image.svg'
import shareVideo from '../Images/share-video.svg'
import shareComment from '../Images/share-comment.svg'
import ReactPlayer from "react-player";
import {Timestamp} from "@firebase/firestore";
import {postArticleAPI} from "../redux/actions/index.js";

const PostModel = (props)=> {

  const [editorText, setEditorText] = useState('')
  const [assetArea, setAssetArea] = useState('');
  const [shareImage, setShareImage] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleChange =(e)=> {
    const image = e.target.files[0]
    if (image === '' || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`)
    } else {
      setShareImage(image)
    }
  }

  const reset = (e)=> {
    setEditorText('')
    setAssetArea('')
    setShareImage('')
    setVideoLink('')
    props.handleClick(e)
  }

  const switchAssetArea = (e)=> {
    setAssetArea(e)
  }

  const handlePost = (e)=> {
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    }
    props.postArticles(payload)
    console.log(props.postArticles(payload))
    reset(e)
  }


  return (
    <>
      {props.showPopup && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e)=> reset(e)}>
                <img src={closeI} alt="" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                    <img src={props.user.photoURL} alt="" />
                ) : (<img src={userI} alt="" />)}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {
                  assetArea === 'image' ? (
                    <UploadImage>
                      <input type='file' name='image' id='file' onChange={handleChange} style={{ display: "none" }}/>
                      <p>
                        <label htmlFor='file'
                          style={{cursor: "pointer", display: "block", marginBottom: "15px"}}>
                          Select an image to share
                        </label>
                      </p>
                      {shareImage && (
                          <img src={URL.createObjectURL(shareImage)} alt="img" />
                      )}
                    </UploadImage>
                  ) : (assetArea === "media" && (
                      <>
                        <input
                            style={{ width: "100%", height: "30px" }}
                            type="text"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            placeholder="Please input a video link"
                        />
                        {videoLink && (
                            <ReactPlayer width="100%" url={videoLink} />
                        )}
                      </>
                  ))
                }
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={()=> switchAssetArea('image')}>
                  <img src={shareImg} alt="" />
                </AssetButton>
                <AssetButton onClick={()=> switchAssetArea('media')}>
                  <img src={shareVideo} alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src={shareComment} alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton disabled={!editorText} onClick={(e)=> handlePost(e)}>
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 99%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  svg,
  img {
    pointer-events: none;
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  sv,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 30px;
`;
const AssetButton = styled.button`
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
    padding: 10px;
    height: 30px;
    border-radius: 30px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const PostButton = styled.button`
  min-with: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    border: none;
    line-height: 1.5;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const mapStateToProps = (state)=> {
  return {
    loading: state.articlesState.loading,
    user: state.userState.user
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    postArticles: (payload)=> dispatch(postArticleAPI(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
