import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolfer = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  diretorio: tmpFolfer,
  storage: multer.diskStorage({
    destination: tmpFolfer,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(5).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
