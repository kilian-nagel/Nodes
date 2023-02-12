
import * as React from 'react';
import { Component } from 'react';

import PostHeader from '@/components/postHeader';
import TextBox from '@/components/textBox';

function Post() {
    return ( 
        <div id="home">
            <main>
                <PostHeader/>
                <TextBox/>
            </main>
        </div>
    );
}

export default Post;