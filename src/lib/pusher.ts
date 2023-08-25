import PusherServer from 'pusher';
import PusherClent from 'pusher-js';

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: 'ap3',
    useTLS: true,
})

export const pusherClient = new PusherClent(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'ap3',
});