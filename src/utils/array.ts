type MappedItems<T extends { [K in keyof T]: any }, K extends keyof T> = {
  [P in T[K]]: T;
};

export function createItemsById<
  T extends { [K in keyof T]: any },
  K extends keyof T,
>(items: T[], key: K): MappedItems<T, K> {
  const itemMap: MappedItems<T, K> = {} as MappedItems<T, K>;

  for (let item of items) {
    itemMap[item[key]] = item;
  }

  return itemMap;
}

export function groupItemsBy<
  T extends { [K in keyof T]: any },
  K extends keyof T,
>(items: T[], key: K): { [key: string]: T[] } {
  const itemMap: { [key: string]: T[] } = {};

  for (let item of items) {
    const value = item[key];

    if (!itemMap[value]) {
      itemMap[value] = [];
    }

    itemMap[value].push(item);
  }

  return itemMap;
}
