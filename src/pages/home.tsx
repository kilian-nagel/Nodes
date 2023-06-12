
import { AsideNavbar } from '@/components/asideNavbar';
import Feed from '@/components/feed';
import { Trends } from '@/components/trends';
import { Suggestions } from '@/components/suggestions';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';

function Home() {
    return ( 
        <div id="home">
            <main id='main'>
                <aside className='left'>
                    <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                        <Suspense fallback={<MoonLoader/>}>
                            <AsideNavbar></AsideNavbar>
                        </Suspense>
                    </ErrorBoundary>
                </aside>
                <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                    <Suspense fallback={<MoonLoader/>}>
                        <Feed></Feed>
                    </Suspense>
                </ErrorBoundary>
                <aside className="right">
                    <ErrorBoundary fallback={<div>Could not fetch data</div>}>
                        <Suspense fallback={<MoonLoader/>}>
                            <Trends></Trends>
                            <Suggestions></Suggestions>
                        </Suspense>
                    </ErrorBoundary>
                </aside>
            </main>
        </div>
    );
}

export default Home;