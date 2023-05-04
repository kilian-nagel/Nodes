
import Navbar from '@/components/navbar';
import Feed from '@/components/feed';
import { NextPage } from 'next/types';

const Home: NextPage = ()=>{
    return ( 
        <div id="home">
            <Navbar></Navbar>
            <main>
                <Feed></Feed>
            </main>
        </div>
    );
}

export default Home;
