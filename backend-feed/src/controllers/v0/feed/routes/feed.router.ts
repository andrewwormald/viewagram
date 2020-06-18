import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
     if (!req.headers || !req.headers.authorization){
         return res.status(401).send({ message: 'No authorization headers.' });
     }
     
 
     const token_bearer = req.headers.authorization.split(' ');
     if(token_bearer.length != 2){
         return res.status(401).send({ message: 'Malformed token.' });
     }
     
     const token = token_bearer[1];
     return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
       if (err) {
         return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
       }
       return next();
     });
 }

router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

router.get('/user/:email', async (req: Request, res: Response) => {
    let { email } = req.params;
    const items = await FeedItem.findAndCountAll({where: { owner: email },order: [['id', 'DESC']]});
    items.rows.map((item) => {
        if(item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    res.send(item);
});

// Update likeCount by 1
router.post('/:id/like',
    requireAuth, 
    async (req: Request, res: Response) => {
        let { id } = req.params;
        const item = await FeedItem.findByPk(id);
        item.likeCount += 1
        await item.save()

        res.status(201).send(item);
});

router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileUrl = req.body.url;
    const owner = req.body.userEmail;

    if (!owner) {
        return res.status(400).send({ message: 'Owner is required or malformed' });
    }

    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    if (!fileUrl) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            owner: owner,
            likeCount: 0,
            url: fileUrl
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;
