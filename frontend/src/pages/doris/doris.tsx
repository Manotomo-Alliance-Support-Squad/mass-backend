import React from 'react';

import './doris.css';

export interface DorisPageProps {
}

export interface DorisPageState {
}

export default class DorisPage extends React.Component<DorisPageProps, DorisPageState> {

    render() {
        return (
            <div>
                <p>
                Doris, you always talked to us like friends and family, and it’s difficult to
                see you go back to the ocean.
                </p>
                <p>
                You have been, and will be, the best DD Hololive CN housed, and who can forget
                your <a href="https://www.bilibili.com/video/BV1cA41187LW">gachi koi for Rosalyn</a><a href="https://www.bilibili.com/video/BV14e411s7jd">?</a> Thanks
                for your <a href="https://www.bilibili.com/video/BV19f4y1Y7Ni">first and last song</a>,
                and we won’t forget our promise to count down these next 10 years... To our next meeting!
                </p>
                <br/><hr/><br/>
                <p>
                朵莉丝，你一直把我们当为朋友，家人，我们看你回到大海也很伤心难过。
                </p>
                <p>
                你永远会是Hololive CN最好的DD，你和<a href="https://www.bilibili.com/video/BV1cA41187LW">罗莎琳的gachi恋</a><a href="https://www.bilibili.com/video/BV14e411s7jd">也是个我们不可忘的记忆</a>。
                谢谢你的<a href="https://www.bilibili.com/video/BV19f4y1Y7Ni">第一和最后一首歌</a>，我们不会忘记我们和你的十年之约。。。每天我们在期待过10年后再次相逢！
                </p>
            </div>
        );
    }

}
