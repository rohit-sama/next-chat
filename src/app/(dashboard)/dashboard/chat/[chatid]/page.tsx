import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { messageListValidator } from '@/lib/validations/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface pageProps {
    params: {
        chatid: string;
    };
}

async function getMessages(chatid: string) {
    try {
        const results: string[] = await fetchRedis('zrange', `chat:${chatid}:messages`, 0, -1);

        const dbMessages = results.map((message) => JSON.parse(message) as Message);

        const reversedMessages = dbMessages.reverse();
        const messages = messageListValidator.parse(reversedMessages);

        return messages;
    } catch (error) {
        notFound();
    }
}

const page = async ({ params }: pageProps) => {
    const { chatid } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
        notFound();
        
    }

    const { user } = session;
    const [userId1, userId2] = chatid.split('--');
    console.log(user.id)
    if (userId1 !== user.id && userId2 !== user.id) {
        notFound();
        
    }
    
    const chatPartenerId = userId1 === user.id ? userId2 : userId1;
    const chatPartner = (await db.get(`user:${chatPartenerId}`)) as User;
    const initialMessages = await getMessages(chatid);

    return <div>{chatPartner.email}</div>;
};

export default page;
