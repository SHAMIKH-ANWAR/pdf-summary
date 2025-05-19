export const parseSection = (section: string): { title: string; points: string[] } => {
  // Extract and clean the title
  const [title, ...content] = section.split('\n');
  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  
  let currentPoint = '';
  
  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('*')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = '';
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });
  
  if (currentPoint) points.push(currentPoint.trim());
  
  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith('#') && !point.startsWith('[Choose')
    ) as string[],
  };
};

// Helper function to parse content into sections
export function parseContent(content: string) {
  const lines = content.split('\n');
  let title = lines[0] || '';
  title = title.trim();
  
  const sections = content.split(/^#\s+/m).filter(Boolean);
  
  return {
    title,
    sections: sections.map(parseSection),
  };
}