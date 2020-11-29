type ID = string;

export interface IUser {
  id: ID;
  name: string;
  picture: string;
  email?: string;
}

interface ISensorDataComponent {
  alert: boolean;
  data: [{
    timestamp: string;
    value: number;
  }],
  max: number;
  unit: string;
}

export interface IPost {
  id: ID;
  title: string;
  tags?: string[];
  imageUrl?: string;
  location: {
    coordinates: [number, number];
    street: string;
    city: string;
    province: string;
  };
  creatorId: ID; // could be ID of user or sensor
  creatorType: "sensor" | "user";
  anomalyType: 'air' | 'water' | 'soil';
  created: Date;
  comments: IComment[];
  data?: {
    components: { [key: string]: ISensorDataComponent }
  }
}

//
// /sensors/:sensorId/?start=DDMMYYYTTTT&end=DDMMYYYTTTT
//
// GET /posts?sort=recent&location=54.23434,4.123: [{ id: sfls, comments: [{}]}]
// GET /posts/:postId/comments
//
// GET /users/:userId

export interface IComment {
  creatorId: ID;
  text: string;
  attachments?: string[];
  comments?: IComment[];
  created: Date;
}

const users: IUser[] = [
  { id: "1", name: "Samuel Sital", picture: "" },
  { id: "2", name: "Remi van der Laan", picture: "" },
  { id: "3", name: "Gwen Lohard", picture: "" },
];

const posts: IPost[] = [
  {
    id: "EZ_PM10_HIGH_4352",
    title: "Anomaly in Rijswijkseweg last night",
    creatorId: "1",
    creatorType: "user",
    anomalyType: 'air',
    created: new Date("2020-11-26"),
    tags: ['PM10', 'CO2'],
    location: {
      coordinates: [0, 0],
      street: "Rijswijkseweg",
      city: "The Hague",
      province: "South-Holland",
    },
    comments: [
      {
        creatorId: "2",
        created: new Date(),
        text: "It was very smokey last night as well",
        comments: [
          {
            creatorId: "3",
            text: "Yes! I could not go for my run!",
            created: new Date(),
          },
          {
            creatorId: "3",
            text: "FAKE NEWS !!",
            created: new Date(),
          },
        ],
      },
      {
        creatorId: "3",
        text: "picture.png",
        attachments: ['picture.png'],
        created: new Date(),
      },
      {
        creatorId: "3",
        created: new Date(),
        text: "I agree! I have created an online petition for this incidence",
        comments: [
          {
            creatorId: "3",
            text: "Good job!",
            created: new Date(),
          },
        ],
      },
    ],
  },
];

export interface CommentWithCreator extends IComment {
  creator: IUser;
  comments: CommentWithCreator[];
};

const findCreator = (id: ID) => users.find((u) => u.id === id)!;

export function unifyComment(comment: IComment, users: IUser[]): CommentWithCreator {
  return ({
    ...comment,
    creator: findCreator(comment.creatorId),
    comments: comment.comments?.map(u => unifyComment(u, users)) || [],
  });
}

export type PostData = IPost & { comments: CommentWithCreator[], creator: IUser };

const mockData: PostData[] = posts.map((p) => ({
  ...p,
  creator: findCreator(p.creatorId),
  comments: p.comments.map(u => unifyComment(u, users)),
}));

export default mockData;
