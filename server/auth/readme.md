### Generate OpenSSL RSA Key Pair from the Command Line
// https://rietta.com/blog/openssl-generating-rsa-key-from-command/

command: openssl genrsa -des3 -out private.pem 2048
 
this creates private.key which provide to login

then generate public key

command: openssl rsa -in private.pem -outform PEM -pubout -out public.pem

https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

### General notes

LDAP (как HTTP) - протокол (куча правил) с помощью которого идем за службой каталогов в которой хранится инфа от пользователей 

у него куча реализаций, например Active directory (реализация LDAP протокоола, служба каталогов, дерево с группами и юзерами)

Когда заходишь по логин пароль нц то могу логиниться куда огодно, так как все системы используют 1 лдап сервер, те единое хранилище персональных данных пользователя чтобы все системы могли авторизовать пользователя по протоколу LDAP

c ldap работает identity provider (у нас это кейклок, который умеет настраивается на LDAP и несколько вендоров (active directory))

лдап синхронизируется с кейклоком и томсом

SSO - технология, при использовании которой пользователь переходит из одного раздела портала в другой, либо из одной системы в другую, не связанную с первой системой, без повторной аутентификации.

Security Assertion Markup Language (SAML)  язык разметки, основанный на языке XML. Открытый стандарт обмена данными аутентификации и авторизации между участниками, в частности, между поставщиком учётных записей
Кейклок работает через openIdConnect а не через Saml (в случае cloud CSRD)

ADFS - active directory federation service штука которая позволяет кейклоку засинхронизовться с active directory
