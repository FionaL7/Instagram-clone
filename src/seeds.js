export function seedDatabase(firebase) {
  const users = [
    {
      userId: "TwWHeWHQtHdGkpmWCsKo9WBgtzp1",
      username: "fifi",
      fullName: "Fiona Lazarus",
      emailAddress: "fifilaz@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "natiee",
      fullName: "Natalie Reed",
      emailAddress: "natie4@sanzio.com",
      following: [],
      followers: ["zm5zYyQLJwS6YrrcoPgu44xYJor1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "jakob",
      fullName: "Jakob Kaye",
      emailAddress: "jakobk@dali.com",
      following: [],
      followers: ["zm5zYyQLJwS6YrrcoPgu44xYJor1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "nicholaaas",
      fullName: "Nicholas White",
      emailAddress: "nicholas@orwell.com",
      following: [],
      followers: ["zm5zYyQLJwS6YrrcoPgu44xYJor1"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 7; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/nat/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "jakob",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "nicholaaass",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
