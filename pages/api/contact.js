// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../lib/dbConnect';
import ContactMessage from '../../lib/models/ContactMessage';

export default async function handler(req, res) {
    const db = await dbConnect();
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (!email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid Input' });
            return;
        }

        const newMessage = {
            name,
            email,
            message,
        };
        const dbMessage = await ContactMessage.create(newMessage);
        console.log(newMessage);
        res.status(201).json({
            message: 'Successfully Created',
            message: newMessage,
        });
    }
}