import BaseCard, { BaseCardProps, BaseCardState } from "../../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../../models/language";
import handleViewport from 'react-in-viewport';
import { MultiArtwork, ArtworkMetadata } from '../../../models/artwork';
import './artworkCard.css';
import { linkToString } from '../../../models/url';

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface MultiArtworkCardProps extends BaseCardProps<MultiArtwork> {
}

interface MultiArtworkCardState extends BaseCardState {
    loadingState: ImageLoadingState,
}

export default class MultiArtworkCard extends BaseCard<MultiArtwork, MultiArtworkCardProps, MultiArtworkCardState> {
    private readonly artworks: string[];
    private readonly metadata: ArtworkMetadata;
    private readonly username: string;
    private imageElement: HTMLImageElement;

    constructor(props: MultiArtworkCardProps) {
        super(props);
        this.artworks = props.object.gallery;
        this.metadata = props.object.metadata;
        this.username = this.metadata.username ? props.object.metadata.username : "Anonymous";
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    state: MultiArtworkCardState = {
        loadingState: ImageLoadingState.NotLoaded,
        loaded: false // From BaseCardState
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.state.loadingState === ImageLoadingState.NotLoaded) {
            this.imageElement.src = this.artworks[0];
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
        const artistLink = this.metadata.artistLink ? linkToString(this.metadata.artistLink) : "#no_artist_link";

        return (
            <div className="artwork-card">
                {this.artworks.map((obj, idx) => {
                    return (
                        <img className="artwork-card-img" src={obj} alt={this.metadata.title} />
                    );
                })}
                <div className="artwork-card-footer">
                    <div className="title">{this.metadata.title}</div>
                    <div className="artist">
                        Artist: <a href={artistLink}>{this.username}</a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderArtwork());
    }
}
