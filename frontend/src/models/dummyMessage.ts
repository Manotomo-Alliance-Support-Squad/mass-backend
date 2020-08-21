import {Region} from "./region";

export interface MessageData {
    Native_message: string;
    JP_message_Deepl: string | null;
    Name: string | null;
    Country: Region | null; // TODO
}