type ID = string;

interface IUser {
  id: ID;
  name: string;
  picture: string;
  email?: string;
}

interface IPost {
  id: ID;
  title: string;
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
}

interface IComment {
  creatorId: ID;
  message: string;
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
    location: {
      coordinates: [0, 0],
      street: "Rijswikseweg",
      city: "The Hague",
      province: "South-Holland",
    },
    comments: [
      {
        creatorId: "2",
        created: new Date(),
        message: "It was very smokey last night as well",
        comments: [
          {
            creatorId: "3",
            message: "Yes! I could not go for my run!",
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
function unifyComment(comment: IComment): CommentWithCreator {
  return ({
    ...comment,
    creator: findCreator(comment.creatorId),
    comments: comment.comments?.map(unifyComment) || [],
  }); // HACK
}

const mockData = posts.map((p) => ({
  ...p,
  creator: findCreator(p.creatorId),
  comments: p.comments.map(unifyComment),
}));

export default mockData;
