import Post from "./post.model";
import User from "./user.model";


User.hasMany(Post , { foreignKey: "userId",as:"posts" });


Post.belongsTo(User, { foreignKey: "userId",as:"user" });
