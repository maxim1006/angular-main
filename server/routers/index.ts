export * from './dictionaries.router';
export * from './example.router';
export * from './family.router';
export * from './rxjs.router';
// у multer есть зависимости которые ссылаются на new Buffer, на это ругается нода и не собирается как починят
// раскомментировать
export * from './upload.router';
export * from './login.router';
