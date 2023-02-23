
import Navbar from '@/components/navbar';
import Feed from '@/components/feed';

function Home() {
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