export class ValidationConstants {
    static PHONE_NUMBER:RegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;
    static EMAIL:RegExp = /\b\w+@\w+\.\w+\b/i;
    static ZIP:RegExp = /\b\d{4}-\d{4}\b/i;
}