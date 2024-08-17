export function isPhoneValid(phone: string): boolean {
    const phoneRegex = /^\+\d{11,12}$/;
    return phoneRegex.test(phone);
}