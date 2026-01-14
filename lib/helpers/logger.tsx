export const logme = (data: any, name?: string) => {
  if (!name) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log(`${name}: `, JSON.stringify(data, null, 2));
  }
};
