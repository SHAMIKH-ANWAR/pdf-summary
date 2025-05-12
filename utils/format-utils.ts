export function formatFileNameAsTitle(fileName: string) {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
    const withSpaces = withoutExtension.replace(/[-_]*/g, " ")
    .replace(/([a-z])([A-Z])/g,'$1 $2')//add space between camel case
    return withSpaces.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}