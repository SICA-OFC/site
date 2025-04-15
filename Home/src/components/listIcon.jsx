export default function ListIcon({ fill, d, href }) {
  return (
    <a href={href}>
      <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill={fill} d={d} />
      </svg>
    </a>
  );
}
