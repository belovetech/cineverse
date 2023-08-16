/// <reference types="node" />
export default function customMorgan(): (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error) => void) => void;
