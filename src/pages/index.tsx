import Navbar from '@/components/navbar'
import SkipLinks from '@/components/skipLinks'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image'

import { useState, useEffect } from 'react';
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import { getUserInfo, addUser} from '@/data/users';
import { NextPage } from 'next/types';


library.add(faBarsStaggered);
const inter = Inter({ subsets: ['latin'] })

const Home:NextPage = () => {
  const {user} = useUser();
  const [userData,setUserData] = useState({});
  const [style, setStyle] = useState({
    display: "none",
  });

  useEffect(()=>{
    (async ()=> {
      if (user===null || user===undefined || user.sub === null || user.sub === undefined) return;
      const userData = await getUserInfo(user.sub);

      /* Si l'utilisateur avec l'uid actuelle n'existe pas cela signifie qu'il vient de crée son compte.
         Donc on demande au serveur de créer cet utilisateur.
      */
      if(userData === undefined || userData === null){
        const nickname = user.nickname ? user.nickname : "guest";
        const userAdded = await addUser(nickname,user.sub);
        if (userAdded) await setCurrentUserData(user,setUserData);
      } else if(userData!==null && userData!==undefined){
        await setCurrentUserData(user,setUserData);
      }
    })();
  },[user]);
  
  return (
    <div>
      <Head>
        <title>Nodes - Social Network</title>
        <meta name="description" content="Nodes - Social network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <SkipLinks path="#home"></SkipLinks>
        <Navbar></Navbar>
        <section id="home">
          <div className="inner">
            <div className="content">
              <h1 className="title font-bold">Join our awesome community</h1>
              <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, incidunt aperiam consectetur provident tenetur pariatur.</p>
              <div className="buttons">
                <Link href="" className="btn-default cta" aria-label='go to registration page' title='go to registration page'>Sign up</Link>
                <Link href="/api/auth/login" className="link-default cta" aria-label='go to registration page' title='go to registration page'>Login</Link>
              </div>
            </div>
            <div className="preview">
              <Image width={325} height={406.25} src={"/home.jpg"} alt="image d'un homme" role="presentation" priority/>
            </div>
          </div>
        </section>
        <section id="partners">
          <div className="inner">
            <h2 className='subtitle font-bold'>We collaborate with awesome companies</h2>
            <div className="slide">
              <div className="row">
                <span className="companies">Google Microsoft Mozilla NextJS Accenture Adobe Amazon Apple Atos&nbsp;</span>
                <span className="companies">Google Microsoft Mozilla NextJS Accenture Adobe Amazon Apple Atos&nbsp;</span>
              </div>
              <div className="row">
                <span className="companies">Capgemini Cisco Cognizant IBM Intel Mastercard Lenovo Oracle Qualcomm&nbsp;</span>
                <span className="companies">Capgemini Cisco Cognizant IBM Intel Mastercard Lenovo Oracle Qualcomm&nbsp;</span>
              </div>
            </div>
          </div>
        </section>
        <section id="features">
          <div className="container">
            <div className="inner flex-start-center">
              <div className="count">
                <p className="index flex-center-center">01</p>
              </div>
              <div className="content">
                <h2 className="subtitle font-bold">Connect with your friends</h2>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestiae in sequi aut nisi quibusdam labore aliquid doloremque ratione quam perspiciatis, dignissimos aperiam velit natus consequatur dolore totam, nostrum esse!</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="inner flex-start-center">
              <div className="count">
                <p className="index flex-center-center">02</p>
              </div>
              <div className="content">
                <h2 className="subtitle font-bold">Share your memories</h2>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestiae in sequi aut nisi quibusdam labore aliquid doloremque ratione quam perspiciatis, dignissimos aperiam velit natus consequatur dolore totam, nostrum esse!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Home;

async function setCurrentUserData(user:UserProfile,setUserData:(arg0:Object)=>void){
  if (user.sub===undefined || user.sub===null) return;
  setUserData(getUserInfo(user.sub));
}