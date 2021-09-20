export const isHexaNumber = (s: string) => {
  const regExp = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/;
  return typeof s === "string" && regExp.test(s);
};
