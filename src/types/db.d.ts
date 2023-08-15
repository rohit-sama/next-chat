interface User{
    id: string;
    name: string;
    email: string;
    image: string;
}
interface Message{
    id :string,
    senderId: string,
    recieverId: string,
    text: string,
    timestamp: number
}

interface Chat {
    id : string,
    messages : Message[],
}

interface friendRequest{
    id : string,
    senderId : string,
    recieverId : string,
}