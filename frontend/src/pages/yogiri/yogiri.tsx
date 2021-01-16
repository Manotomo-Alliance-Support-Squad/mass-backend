import React from 'react';

import './yogiri.css';

export interface YogiriPageProps {
}

export interface YogiriPageState {
}

export default class YogiriPage extends React.Component<YogiriPageProps, YogiriPageState> {

    render() {
        return (
            <div>
                <p>
                大姐头, there’s too many memories for us to recount and find the words to thank you for
                memories. From your <a href="https://www.bilibili.com/video/av67610922">cover of Cynic</a> you
                mixed yourself, all the way to your <a href="https://www.bilibili.com/video/BV1Hk4y117iz">ultra cute costume</a>,
                we’ll miss spending time with you, your laughs, your songs, and much more.
                </p>

                <p>
                Be a free and wild cat with 饱饱, have some great foods, and maybe accidentally show up one
                day after you’ve had a few bottles.
                </p>
                <br/><hr/><br/>
                <p>
                大姐头，有太多和你创造的回忆，不可能说的完我们对你的感谢。从你自己<a href="https://www.bilibili.com/video/av67610922">唱和mix的Cynic</a>，
                到你最近<a href="https://www.bilibili.com/video/BV1Hk4y117iz">show的可爱新衣</a>，我们都会在这挂念你的。 我们会想到我们和你一起的时光，你的笑容，你的歌。。。
                和更多的一切。
                </p>

                <p>
                希望你能和抱抱同享猫命，大吃大喝，睡得好吃的飽。说不定那一天你多喝几杯，又突然可跟我们巧遇！
                </p>
            </div>
        );
    }

}
