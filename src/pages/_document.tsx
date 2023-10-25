import { Html, Head, Main, NextScript } from 'next/document';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { createContext, useCallback, useEffect, useState } from 'react';
import mongoose, { Mongoose } from 'mongoose';
import userSchema from '@/interfaces/user';
import { getUserInfo } from '@/data/users';

export const UserDataContext = createContext<userSchema>({
  _id:new mongoose.Types.ObjectId(),
  uid:"",
  username:"",
  picture:"",
  friends:[],
  messages:[],
  posts:[]
});

export default function Document() {
  const user = useUser();
  const [userData,setUserData] = useState<userSchema>({
    _id:new mongoose.Types.ObjectId(),
    uid:"",
    username:"",
    picture:"",
    friends:[],
    messages:[],
    posts:[]
  });

  useEffect(()=>{
    let flag = true;

    async function fetchUserData(){
      let uid;
      if(user === undefined && user===null) return;
      const data = await getUserInfo(userData.uid);
      if(flag){
        if(data===undefined){return;}
        if(data.data !== undefined || data.data===null) return;
        setUserData(data.data);
      }   
    }

    return () => {
      flag = false;
    }
  },[]);

  return (
    <Html lang="en">
      <Head />
      <body>
        <UserProvider>
          <UserDataContext.Provider value={userData}>
            <Main />
            <NextScript />
          </UserDataContext.Provider>
        </UserProvider>
      </body>
    </Html>
  )
}
