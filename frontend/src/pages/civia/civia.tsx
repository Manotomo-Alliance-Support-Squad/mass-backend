import React from 'react';

import './civia.css';

export interface CiviaPageProps {
}

export interface CiviaPageState {
}

export default class CiviaPage extends React.Component<CiviaPageProps, CiviaPageState> {

    render() {
        return (
            <div>
                <p>
                Civia, as you <a href="https://www.youtube.com/watch?v=dB3pjUFOy3Y">just started on YouTube</a>, we’ve
                already have to bid goodbye to you… We hope you’ve already gotten past those tears. We could never
                forget the your 459 messages before your B站 debut and, of course, the moments we spent playing
                Undertale together.
                </p>
                <p>
                We will continue your legacy - after all DD will bring world peace.
                </p>
                <p>
                P.S. Also, we’ll also never forget <a href="https://www.youtube.com/watch?v=2fvZfHVPMP4">your love for Aqua senpai</a>.
                </p>
                <br/><hr/><br/>
                <p>
                希薇娅，你才<a href="https://www.youtube.com/watch?v=dB3pjUFOy3Y">刚在Youtube上开始</a>，我们就得跟你告别了。。。
                我们希望你可高兴起来，可和我们一起笑。我们不可能忘掉你在B站首播前前发的459封信，更不可能忘掉我们一起玩Undertale的时间。
                </p>
                <p>
                我们会带着您的故事前进 - 毕竟，DD会带来世界和平。
                </p>
                <p>
                P.S. 我们也绝对不忘记你对Aqua的<a href="https://www.youtube.com/watch?v=2fvZfHVPMP4">热情</a>。
                </p>
            </div>
        );
    }

}
