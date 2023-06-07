
import { AsideNavbar } from '@/components/asideNavbar';
import Feed from '@/components/feed';
import { Trends } from '@/components/trends';
import { Suggestions } from '@/components/suggestions';

function Home() {
    return ( 
        <div id="home">
            <main id='main'>
                <aside className='left'>
                    <AsideNavbar></AsideNavbar>
                </aside>
                <Feed></Feed>
                <aside className="right">
                    <Trends></Trends>
                    <Suggestions></Suggestions>
                </aside>
            </main>
        </div>
    );
}

export default Home;