/**
 * Generates a unique string ID
 * @see https://github.com/ai/nanoid
 */
function nanoid(): string {
  let id = "";
  let size = 21;
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size) {
    // eslint-disable-next-line no-bitwise
    const byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "_";
    } else {
      id += "-";
    }

    size -= 1;
  }
  return id;
}

export default nanoid;
