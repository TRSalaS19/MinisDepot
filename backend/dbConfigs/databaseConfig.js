import colors from 'colors';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB connected: ${con.connection.host}`.underline.brightYellow)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit()
  }
}

export default connectDB