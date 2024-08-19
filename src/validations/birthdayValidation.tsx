

export function isBirthdayValid(birthday: string): boolean {
    const birthdayDate = new Date(birthday);
    if (isNaN(birthdayDate.getTime())) return false;
    return true;
}
export function isBirthdayValidAndAdult(birthday: string): boolean {
    if (!isBirthdayValid(birthday)) return false;
    const birthdayDate = new Date(birthday);
    const now = new Date();
    const age = now.getFullYear() - birthdayDate.getFullYear();
    if (now.getMonth() < birthdayDate.getMonth() || (now.getMonth() === birthdayDate.getMonth() && now.getDate() < birthdayDate.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}