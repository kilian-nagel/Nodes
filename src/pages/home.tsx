
import { AsideNavbar } from '@/components/asideNavbar';
import Feed from '@/components/feed';
import { Trends } from '@/components/trends';
import { Suggestions } from '@/components/suggestions';
import { ErrorBoundary } from 'react-error-boundary';
import { MenuNavbar } from '@/components/menuNavbar';

function Home() {
    return ( 
        <div id="home">
            <MenuNavbar></MenuNavbar>
            <main id='main'>
                <aside className='left'>
                    <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                        <AsideNavbar></AsideNavbar>
                    </ErrorBoundary>
                </aside>
                <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                    <Feed></Feed>
                </ErrorBoundary>
                <aside className="right">
                    <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                        <Trends></Trends>
                        <Suggestions></Suggestions>
                    </ErrorBoundary>
                </aside>
            </main>
        </div>
    );
}

export default Home;