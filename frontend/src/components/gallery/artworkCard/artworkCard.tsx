import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';
import { linkToString } from '../../../models/url';

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface ArtworkCardProps extends BaseCardProps<Artwork> {
}

interface ArtworkCardState extends BaseCardState {
    loadingState: ImageLoadingState,
}

export default class ArtworkCard extends BaseCard<Artwork, ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;
    private readonly username: string;
    private imageElement: HTMLImageElement;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.object;
        this.username = this.artwork.username ? props.object.username : "Anonymous";
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    state: ArtworkCardState = {
        loadingState: ImageLoadingState.NotLoaded,
        inViewport: false // From BaseCardState
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.state.loadingState === ImageLoadingState.NotLoaded) {
            this.imageElement.src = linkToString(this.artwork.artworkLink);
            this.imageElement.addEventListener("load", this.imageLoaded);

            this.setState({
                loadingState: ImageLoadingState.Loading,
            });
        }
    }

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate() {
        this.setImage();
    }

    renderArtwork() {
        const hasLoaded = this.state.loadingState === ImageLoadingState.Loaded;
        const artworkLink = linkToString(this.artwork.artworkLink);
        const artistLink = this.artwork.artistLink ? linkToString(this.artwork.artistLink) : "#no_artist_link";

        return (
            <div className="artwork-card">
                <img className="artwork-card-img" src={artworkLink} alt={this.artwork.title} />
                <div className="artwork-card-footer">
                    <div className="title">{this.artwork.title}</div>
                    <p>
                        <div className="artist">
                            Artist: <a href={artistLink}>{this.username}</a>
                        </div>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderArtwork());
    }
}
