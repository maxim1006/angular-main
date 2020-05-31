export class ValidationConstants {
    static PHONE_NUMBER = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;
    static EMAIL = /\b\w+@\w+\.\w+\b/i;
    static ZIP = /\b\d{4}-\d{4}\b/i;
}
