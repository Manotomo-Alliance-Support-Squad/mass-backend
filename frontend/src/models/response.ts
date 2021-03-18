import {MessageJson} from "./message";
import {ArtworkJson} from "./artwork";
import {ArchiveJson} from "./archive";
import {AnnouncementJson} from "./announcement";

interface BaseResponse {
    status: string;
}

export interface MessageResponse extends BaseResponse {
    messages: MessageJson[];
}

export interface GalleryResponse extends BaseResponse {
    gallery: ArtworkJson[];
}

export interface ArchiveResponse extends BaseResponse {
    archives: ArchiveJson[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}

export interface AnnouncementResponse extends BaseResponse {
    announcements: AnnouncementJson[];
}
