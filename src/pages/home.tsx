
import Navbar from '@/components/navbar';
import Feed from '@/components/feed';
import { Trends } from '@/components/trends';
import { Suggestions } from '@/components/suggestions';

function Home() {
    return ( 
        <div id="home">
            <Navbar></Navbar>
            <main id='main'>
                <Trends></Trends>
                <Feed></Feed>
                <Suggestions></Suggestions>
            </main>
        </div>
    );
}

export default Home;