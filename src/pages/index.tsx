import Navbar from '@/components/navbar'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBarsStaggered);
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Nodes - Social Network</title>
        <meta name="description" content="Nodes - Social network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Navbar></Navbar>
        <section id="home">
          <div className="inner">
            <div className="content">
              <h1 className="title">Join our awesome community</h1>
              <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, incidunt aperiam consectetur provident tenetur pariatur.</p>
              <div className="buttons">
                <button className="btn-default cta">Sign up</button>
                <button className="link-default cta">Login</button>
              </div>
            </div>
            <div className="preview">
              <img width={325} src="./home.jpg" alt="image d'un réseau social" />
            </div>
          </div>
        </section>
        <section id="partners">
          <div className="inner">
            <h2 className='subtitle'>We collaborate with awesome companies</h2>
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
                <h2 className="subtitle">Connect with your friends</h2>
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
                <h2 className="subtitle">Share your memories</h2>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestiae in sequi aut nisi quibusdam labore aliquid doloremque ratione quam perspiciatis, dignissimos aperiam velit natus consequatur dolore totam, nostrum esse!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}