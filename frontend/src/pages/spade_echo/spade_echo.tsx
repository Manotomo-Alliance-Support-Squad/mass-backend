import React from 'react';

import './spade_echo.css';

export interface SpadeEchoPageProps {
}

export interface SpadeEchoPageState {
}

export default class SpaceEchoPage extends React.Component<SpadeEchoPageProps, SpadeEchoPageState> {

    render() {
        return (
            <div>
                <p>
                    ECHO, even though you said you’re not good at singing, you bravely came to us
                    with <a href="https://www.youtube.com/watch?v=2h-Ag_zAAUs">a song as introduction</a>, and kept
                    on going with your <a href="https://www.youtube.com/watch?v=ByNUFWPiyeU">original song</a> this
                    year. We’ll never forget all the good times with you, whether it was fumbling
                    with <a href="https://www.youtube.com/watch?v=4FrJvvI91r0">lag when playing games</a> or
                    getting <a href="https://www.youtube.com/watch?v=z2csKn2bZG0">asked for an adult on the phone</a>; all
                    of it were unforgettable memories.
                </p>
                <p>
                    You had stolen many of our hearts and escaped with it. A true 怪盗. We hope you come back
                    and steal us away one day...
                </p>
                <br/><hr/><br/>
                <p>
                    黑桃影，你跟我们说了你不会唱歌，但又勇敢的在你的<a href="https://www.youtube.com/watch?v=2h-Ag_zAAUs">第一个直播唱了</a>。
                    之后还出了<a href="https://www.youtube.com/watch?v=ByNUFWPiyeU">一首漂亮的原作</a>。
                    我们永远不会忘记我们和你创造的回忆 - <a href="https://www.youtube.com/watch?v=4FrJvvI91r0">当你在拆炸弹的时候，你的网络卡了</a>；
                    你在<a href="https://www.youtube.com/watch?v=z2csKn2bZG0">接电话时，被问家里有没有大人</a>。
                </p>
                <p>
                    你抓住了我们的心，我们的爱，就跑了。真是一个正统的怪盗。我们希望某一天，你能回来也我们偷了。
                </p>
            </div>
        );
    }

}
