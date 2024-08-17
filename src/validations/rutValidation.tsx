function isRutValid(rut: string): boolean {
    // Adjust the regex to ignore dots and improve validation
    if (!/^\d{1,2}\.\d{3}\.\d{3}-[0-9K]$/i.test(rut)) return false;

    // Remove dots for processing
    let cleanRut = rut.replace(/\./g, '');

    const series = [2, 3, 4, 5, 6, 7];
    let charToValidate = cleanRut.substring(cleanRut.length - 1).toUpperCase();
    const totalSum = cleanRut
        .substring(0, cleanRut.length - 2)
        .split('')
        .reverse()
        .map((digit, index) => parseInt(digit) * series[index % series.length])
        .reduce((acc, cur) => acc + cur, 0);
    const truncatedSum = Math.trunc(totalSum / 11) * 11;
    const finalNumber = 11 - (totalSum - truncatedSum);
    const resultChar = finalNumber === 11 ? '0' : finalNumber === 10 ? 'K' : finalNumber.toString();

    return resultChar === charToValidate;
}
export { isRutValid };