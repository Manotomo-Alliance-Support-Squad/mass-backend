import { stringToLink, linkToString, ExternalLink } from "./url";

export interface Video {
    videoID: number;
    videoLink: ExternalLink;
    artistLink: ExternalLink;
    username: string;
    title: string;
}

export interface VideoJson {
    videoID: number;
    videoLink: string;
    artistLink: string;
    username: string;
    title: string;
}

export function videoFromJson(json: VideoJson): Video {
    const { videoID, videoLink, artistLink, username, title } = json;
    return {
        videoID,
        videoLink: stringToLink(videoLink),
        artistLink: stringToLink(artistLink),
        username,
        title,
    }
}

export function videoToJson(video: Artwork): ArtworkJson {
    const { videoID, videoLink, artistLink, username, title } = video;
    return {
        videoID,
        videoLink: linkToString(videoLink),
        artistLink: linkToString(artistLink),
        username,
        title,
    }
}
