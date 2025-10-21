export const formatTelefone = async (v) => {
    v = v.replace(/\D/g, "");
    v = v.substring(0, 11);

    if (v.length > 10) {
        return v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    if (v.length > 6) {
        return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    }
    if (v.length > 2) {
        return v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    }
    else {
        return v = v.replace(/\D/g, "");
    }
}