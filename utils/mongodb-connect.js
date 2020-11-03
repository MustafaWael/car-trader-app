import mongoose from "mongoose";
const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("db already connected");
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected && "db connected");
};

export default dbConnect;
