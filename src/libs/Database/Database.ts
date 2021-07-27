import * as mongoose from 'mongoose';
class DataBase {
  open = (mongoUrl: string) => new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  close = () => {
    mongoose.connection.close();
  };
}

export default DataBase;
