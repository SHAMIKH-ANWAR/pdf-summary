export function formatFileNameAsTitle(fileName: string) {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
    const withSpaces = withoutExtension.replace(/[-_]*/g, " ");
    .replace(/())//add space between camel case