const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const convertSnakeToCamelCase = (obj: any) => {
  const newObj: any = {};

  if (obj) {
    for (const key in obj) {
      const tokens = key.split('_');
      const newTokens: string[] = [];

      tokens.forEach((token, index) => {
        if (index === 0) {
          newTokens.push(token);
        } else {
          newTokens.push(capitalizeFirstLetter(token));
        }
      });

      const newKey = newTokens.join('');

      if (typeof obj[key] === 'object' && obj[key].length === undefined) {
        newObj[newKey] = convertSnakeToCamelCase(obj[key]);
      } else {
        newObj[newKey] = obj[key];
      }

    }
  }

  return newObj;
};
