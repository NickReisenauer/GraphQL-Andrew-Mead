const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },

  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@gmail.com",
      age: 28,
    };
  },

  posts(parent, args, { db }, info) {
    if (!args.query) return db.posts;
    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
