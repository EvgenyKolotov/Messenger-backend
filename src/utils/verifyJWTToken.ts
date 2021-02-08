import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface DecodedData {
  data: {
    _doc: IUser;
  };
}

const verifyJWToken = (token: string): Promise<DecodedData> => {
  return new Promise(
    (resolve: (decodedData: DecodedData) => void, reject: (err: jwt.JsonWebTokenError) => void) => {
      jwt.verify(token, <string>process.env.JWT_SECRET, (err, decodedData) => {
        if (err || !decodedData) {
          return reject(<jwt.JsonWebTokenError>err);
        }
        resolve(<DecodedData>decodedData);
      });
    }
  );
};

export default verifyJWToken;
