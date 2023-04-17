export default function formateDate(datestr: string) {
  const date = new Date(datestr);
  return date.toLocaleDateString();
}
