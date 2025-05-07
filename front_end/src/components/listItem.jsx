export default function ListItem({ href, texto }) {
  return (
    <li>
      <a href={href}>{texto}</a>
    </li>
  );
}
