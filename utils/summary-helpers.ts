export const parseSection = (section: string) => {
  const lines = section.split('\n');
  const titleLine = lines.find((line) => line.trim().startsWith('# '));
  const title = titleLine ? titleLine.substring(2).trim() : lines[0]?.trim() || '';
  const content = lines.slice(titleLine ? lines.indexOf(titleLine) + 1 : 1).join('\n').trim();
  return { title, content };
};

export function formatPoints(points: string[]): string {
  return points
    .filter((point) => point && !point.startsWith('#'))
    .map((point) => point.replace(/^- /, ''))
    .join('\n');
}

export function summarizeHelper(text: string): { title: string; points: string[] } {
  const trimmedText = text.trim();
  const lines = trimmedText.split('\n');
  let title = lines[0]?.replace(/^# /, '').trim() || '';
  const points: string[] = [];
  let currentPoint = '';

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      if (currentPoint) {
        points.push(currentPoint);
      }
      currentPoint = trimmedLine;
    } else if (trimmedLine.startsWith('# ')) {
      if (currentPoint) {
        points.push(currentPoint);
      }
      title = trimmedLine.substring(2).trim();
      currentPoint = '';
    } else if (trimmedLine) {
      currentPoint += (currentPoint ? ' ' : '') + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint);
  }

  return { title, points };
}