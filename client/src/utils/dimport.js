async function dynamicImport(path) {
  const { default: value } = await import(path);
  return value;
}

export default dynamicImport;
