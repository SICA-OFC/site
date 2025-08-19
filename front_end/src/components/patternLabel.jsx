export default function patternLabel(labelfor, text, type, id, name, pattern) {
  return (
    <div class="div">
      <label for={labelfor}>{text}</label>
      <input type={type} id={id} name={name} pattern={pattern} required />
    </div>
  );
}
