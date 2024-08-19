import { fetchAllUsers } from "../api/userServices";

async function isRutValid(rut: string): Promise<{ valid: boolean; available: boolean }> {
    // Check if RUT already exists in the database
    try {
        const users = await fetchAllUsers();
        const rutExists = users.some((user: { rut: string }) => user.rut === rut);
        if (rutExists) return { valid: true, available: false };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { valid: false, available: false };
    }

    // Adjust the regex to ignore dots and improve validation
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9K]$/i;
    if (!rutRegex.test(rut)) return { valid: false, available: true };

    // Clean RUT (remove dots) for processing, but do not mutate the original value
    const cleanRut = rut.replace(/\./g, '');

    const series = [2, 3, 4, 5, 6, 7];
    const charToValidate = cleanRut.substring(cleanRut.length - 1).toUpperCase();
    const totalSum = cleanRut
        .substring(0, cleanRut.length - 2)
        .split('')
        .reverse()
        .map((digit, index) => parseInt(digit) * series[index % series.length])
        .reduce((acc, cur) => acc + cur, 0);
    const truncatedSum = Math.trunc(totalSum / 11) * 11;
    const finalNumber = 11 - (totalSum - truncatedSum);
    const resultChar = finalNumber === 11 ? '0' : finalNumber === 10 ? 'K' : finalNumber.toString();

    const valid = resultChar === charToValidate;

    return { valid, available: true };
}

export { isRutValid };