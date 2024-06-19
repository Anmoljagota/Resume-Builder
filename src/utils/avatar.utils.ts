export const AvatarContext = (value: string) => {
  if (!value) return "";
  const namesArray = value.split(" ");
  let Avatar = "";
  namesArray.forEach((name: string, index: number) => {
    if (index < 2) {
      Avatar += name[0]?.toUpperCase();
    }
  });
  return Avatar;
};
