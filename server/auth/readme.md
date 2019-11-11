### Generate OpenSSL RSA Key Pair from the Command Line
// https://rietta.com/blog/openssl-generating-rsa-key-from-command/

command: openssl genrsa -des3 -out private.pem 2048
 
this creates private.key which provide to login

then generate public key

command: openssl rsa -in private.pem -outform PEM -pubout -out public.pem
