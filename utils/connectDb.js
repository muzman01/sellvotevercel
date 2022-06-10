import mongoose from "mongoose";
const connectDb = () => {
  if (mongoose.connections[0].readyState) {
    console.log("bağlantı hazırlanıyor");
    return;
  }
  mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (err) throw err;
    console.log("mongoyoya bağlandı");
  });
};

export default connectDb;
