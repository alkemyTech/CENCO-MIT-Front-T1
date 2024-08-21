function validateRole(role: string): boolean {
    if (!role) {
        return false; // El campo está vacío
    }

    if (role !== "admin" && role !== "user") {
        return false; // El campo no es "admin" ni "user"
    }

    return true; // El campo es válido
}