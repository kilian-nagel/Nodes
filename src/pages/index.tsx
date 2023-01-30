import Navbar from '@/components/navbar'
import Head from 'next/head'
import { Inter } from '@next/font/google'

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
        <div id="homepage">
          <div className="content">
            <h1 className="title">Nodes - Social Network</h1>
            <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, incidunt aperiam consectetur provident tenetur pariatur, iure impedit culpa temporibus nesciunt ad ipsam ex! Sapiente nesciunt culpa cumque, dolor quo a iure neque doloribus officiis esse. Eum alias ipsa, eos, ducimus ut corrupti, eius quo dicta dolores quis minus tenetur blanditiis!</p>
            <div className="buttons">
              <button className="btn cta">Sign up</button>
              <button className="btn cta">Login</button>
            </div>
          </div>
          <div className="preview">
            <img src="" alt="" />
          </div>
        </div>
      </main>
    </>
  )
}
