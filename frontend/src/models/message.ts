export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string | null;
    recipient: string;
    username: string;
}

export interface MessageJson {
    messageID: number;
    orig_msg: string;
    tl_msg: string | null;
    recipient: string;
    username: string;
}

export function messageFromJson(json: MessageJson): Message {
    const { messageID, orig_msg, tl_msg, recipient, username } = json;
    return {
        messageID,
        orig_msg,
        tl_msg,
        recipient,
        username,
    }
}

export function messageToJson(message: Message): MessageJson {
    const { messageID, orig_msg, tl_msg, recipient, username } = message;
    return {
        messageID,
        orig_msg,
        tl_msg,
        recipient,
        username,
    }
}
