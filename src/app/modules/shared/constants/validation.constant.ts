export class ValidationConstants {
    static PHONE_NUMBER = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;
    static PHONE_NUMBER1 = /^(([0-9])+([0-9]){10})$/g;
    static EMAIL = /\b\w+@\w+\.\w+\b/i;
    static EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    static ZIP = /\b\d{4}-\d{4}\b/i;
}
