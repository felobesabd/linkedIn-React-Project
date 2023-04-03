import { signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider, storage } from "../../firebase.js";
import {setArticles, setLoading, setUser} from "./actions.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// export const signInAPI = ()=> {
//     return (dispatch) => {
//         signInWithPopup(auth, googleProvider).then((payload)=> {
//             dispatch(setUser(payload.user))
//             console.log(payload)
//         })
//         .catch((error) => console.log(error.message));
//     }
// }
export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, googleProvider)
            .then((payload) => {
                dispatch(setUser(payload.user));
                console.log(payload.user)
            })
            .catch((error) => alert(error.message));
    };
}
export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
            }
        })
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => alert(error.message));
    };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
      if (payload.image) {
          // Upload Image To Storage FireBase
        const storageRef = ref(storage, `images/${payload.image.name}`)
        const uploadRef = uploadBytesResumable(storageRef, payload.image)
        uploadRef.on("state_changed", (snapshot)=> {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done");
        }, (error)=> {
            alert(error)
        }, ()=> {
            // Upload URL Image To Firestore DataBase FireBase
            getDownloadURL(uploadRef.snapshot.ref).then((downloadURL)=> {
              const collRef = collection(db, "articles");
              addDoc(collRef, {
                  actor: {
                      description: payload.user.email,
                      title: payload.user.displayName,
                      date: payload.timestamp,
                      image: payload.user.photoURL,
                  },
                  comments: 0,
                  video: payload.video,
                  description: payload.description,
                  shareImg: downloadURL,
               }).then((error)=> alert(error));
            })
          dispatch(setLoading(false))
        })
      } else if (payload.video) {
          const collRef = collection(db, "articles");
          addDoc(collRef, {
              actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: payload.timestamp,
                  image: payload.user.photoURL,
              },
              comments: 0,
              video: payload.video,
              description: payload.description,
              shareImg: payload.image,
          }).then((error)=> alert(error));
          dispatch(setLoading(false));
      } else {
          const collRef = collection(db, "articles");
          addDoc(collRef, {
              actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: payload.timestamp,
                  image: payload.user.photoURL,
              },
              comments: 0,
              video: payload.video,
              description: payload.description,
              shareImg: payload.image,
          }).then((error)=> alert(error));
          dispatch(setLoading(false));
      }
  };
}

// export function postArticleAPI(payload) {
//     return (dispatch) => {
//         dispatch(setLoading(true));
//         if (payload.image) {
//             const storageRef = ref(storage, `images/${payload.image.name}`);
//             const uploadRef = uploadBytesResumable(storageRef, payload.image);
//             uploadRef.on(
//                 "state_changed",
//                 (snapshot) => {
//                     const progress =
//                         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log("Upload is " + progress + "% done");
//                 },
//                 (error) => {
//                     alert(error);
//                 },
//                 () => {
//                     getDownloadURL(uploadRef.snapshot.ref).then((downloadURl) => {
//                         const collRef = collection(db, "articles");
//                         addDoc(collRef, {
//                             actor: {
//                                 description: payload.user.email,
//                                 title: payload.user.displayName,
//                                 date: payload.timestamp,
//                                 image: payload.user.photoURL,
//                             },
//                             comments: 0,
//                             video: payload.video,
//                             description: payload.description,
//                             shareImg: downloadURl,
//                         });
//                     });
//                     dispatch(setLoading(false));
//                 }
//             );
//         } else if (payload.video) {
//             const collRef = collection(db, "articles");
//             addDoc(collRef, {
//                 actor: {
//                     description: payload.user.email,
//                     title: payload.user.displayName,
//                     date: payload.timestamp,
//                     image: payload.user.photoURL,
//                 },
//                 comments: 0,
//                 video: payload.video,
//                 description: payload.description,
//                 shareImg: payload.image,
//             });
//             dispatch(setLoading(false));
//         } else {
//             const collRef = collection(db, "articles");
//             addDoc(collRef, {
//                 actor: {
//                     description: payload.user.email,
//                     title: payload.user.displayName,
//                     date: payload.timestamp,
//                     image: payload.user.photoURL,
//                 },
//                 comments: 0,
//                 video: payload.video,
//                 description: payload.description,
//                 shareImg: payload.image,
//             });
//             dispatch(setLoading(false));
//         }
//     };
// }

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        const collRef = collection(db, "articles");
        const orderRef = query(collRef, orderBy('actor.date', 'desc'))
        onSnapshot(orderRef, (snapshot)=> {
            payload = snapshot.docs.map((doc)=> doc.data())
            console.log(payload)
            dispatch(setArticles(payload))
        })
    };
}












