export const formatString = (input: string) => {
    return input;
    // Split the string into words
    let words = input?.split("-");

    // Capitalize the first letter of each word and join them back together
    let result = words?.map(word => word?.charAt(0).toUpperCase() + word?.slice(1)).join(" ");

    return result;
}