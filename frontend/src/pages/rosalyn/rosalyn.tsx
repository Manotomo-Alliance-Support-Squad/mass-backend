import React from 'react';

import './rosalyn.css';

export interface RosalynPageProps {
}

export interface RosalynPageState {
}

export default class RosalynPage extends React.Component<RosalynPageProps, RosalynPageState> {

    render() {
        return (
            <div>
                <p>
                館長, your voice in your <a href="https://www.bilibili.com/video/BV1zi4y1b7Sz">“this game” cover</a> surprised
                many of us, especially since we were waiting for a mushroom to show up. We’ve
                loved cheering you on, whether it was coming back alive from a mic explosion 事故, strong
                computer PSU 事故, OBS 事故, or just plain playing Hearthstone or Shadowverse.
                </p>

                <p>
                Whether you’re off somewhere playing cards, or going back to your library to whip things
                back to shap, we’re here supporting you!
                </p>
                <br/><hr/><br/>
                <p>
                館長，你唱<a href="https://www.bilibili.com/video/BV1zi4y1b7Sz">【this game】</a>的那一会，我们听到你的歌声，真很惊讶 - 必尽我们都等着蘑菇人出现。
                我们一直都很爱支持你，看之你从麦克风爆炸事故恢复，从强强电脑电源的事故恢复，从OBS事故恢复，
                或者和你一起玩Hearthstone和Shadowverse都是美好的时光。
                </p>

                <p>
                不管你是去哪里，打牌，或者回图书馆收拾，我们一直会在这了支持你。
                </p>
            </div>
        );
    }

}
