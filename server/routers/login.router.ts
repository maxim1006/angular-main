import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import * as expressJwt from 'express-jwt';

const loginRouter = express.Router();
let RSA_PRIVATE_KEY;
let RSA_PUBLIC_KEY;

try {
    RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../auth/private.pem'));
    RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../auth/public.pem'));

    loginRouter.post('/', (req, res) => {
        const {login, password} = req.body;

        console.log('loginRouter post body', req.body);

        if (validateEmailAndPassword()) {
            const userId = findUserIdForEmail(login);
            const user = findUser(login);
            const expiresIn = 10;

            // RS256 is a JWT signature type that is based on RSA, which is a widely used public key encryption technology.
            // jwt.sign создаст токен
            const jwtBearerToken = jwt.sign({}, {key: RSA_PRIVATE_KEY, passphrase: 'admin'}, {
                algorithm: 'RS256',
                expiresIn, // seconds
                subject: userId
            });

            console.log(jwtBearerToken);

            // send the JWT back to the user
            // TODO - multiple options available

            // A Cookie can be marked as Secure, meaning that the browser will only append the cookie to the request
            // if it's being made over an HTTPS connection.
            // A Cookie can also be marked as Http Only, meaning that it's not accessible by the Javascript code at all!
            // Note that the browser will still append the cookie to each request sent back to the server,
            // just like with any other cookie. This prevents script injection attack (or XSS)
            // But sending token in cookie suffers from Cross-Site Request Forgery, also known as XSRF or CSRF, the solution
            // is using Third-party authentication providers that allow us to run the externally hosted login page
            // res.cookie('SESSIONID', jwtBearerToken, {httpOnly: true, secure: true});


            // Another approach is to sent token + expiresIn in respond body:
            // + no XSRF
            // - JWT token is now readable by an attacker in case of a successful script injection attack,
            // while with the HTTP Only cookie that was not possible.
            res.status(200).json({
                idToken: jwtBearerToken,
                expiresIn,
                user
            });
        } else {
            // send status 401 Unauthorized
            res.sendStatus(401);
        }
    });

    loginRouter.get('/data',
        // проверка на то что ключ верный с помощью спец миддлвер, который проверит на expire и соответствие токену
        // присланному с фе с RSA_PUBLIC_KEY
        expressJwt({secret: RSA_PUBLIC_KEY}),
        // если хочу кастомно обрабатывать
        // auth,
        (req, res) => {
            console.log('++++++');
            res.status(200).json('data for logined user');
        });
} catch (e) {
    console.log("login router no RSA KEY ffiles");
}

export {loginRouter};


// Helpers
function findUserIdForEmail(login: string): string {
    return 'id';
}

function findUser(login: string): {name: string} {
    return {
        name: 'Max'
    };
}

function validateEmailAndPassword() {
    return true;
}

// Readme: https://blog.angular-university.io/angular-jwt-authentication/


// кастомный middleware обработки токена
// function auth(req, res, next) {
//     // get the token from the header if present
//     const token = req.headers['x-access-token'] || req.headers['authorization'];
//     // if no token found, return response (without going to the next middelware)
//     if (!token) {
//         return res.status(401).send('Access denied. No token provided.');
//     }
//
//     try {
//         // if can verify the token, set req.user and pass to next middleware
//         const decoded = jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] }, () => {
//             req.user = decoded;
//             console.log("decoded ", decoded);
//             next();
//         });
//     } catch (ex) {
//         // if invalid token
//         res.status(400).send("Invalid token.");
//     }
// }
