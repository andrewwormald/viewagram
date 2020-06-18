export interface FeedItem {
    id: number;
    url: string;
    owner: string;
    caption: string;
    likeCount: number;
    comments: string[];
}

export const feedItemMocks: FeedItem[] = [
    {
        id: 0,
        url: '/assets/mock/xander0.jpg',
        caption: 'Such a cute pup',
        owner: '',
        likeCount: 0,
        comments: [],
    },
    {
        id: 0,
        url: '/assets/mock/xander1.jpg',
        caption: 'Who\'s a good boy?',
        owner: '',
        likeCount: 0,
        comments: [],
    },
    {
        id: 0,
        url: '/assets/mock/xander2.jpg',
        caption: 'Majestic.',
        owner: '',
        likeCount: 0,
        comments: [],
    }
];
