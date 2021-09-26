export const loadImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();

    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
};

export const loadMap = (mapData: string) => {
  return mapData
    .replace("map:", "")
    .trim()
    .split("\n")
    .map((i) =>
      i
        .split("")
        .filter((i) => i !== " s")
        .map((unicode) => {
          return {
            code: unicode,
            degree: 0,
            set rotate(num: number) {
              this.degree = this.degree + num > 360 ? num : this.degree + num;
            },
          };
        })
    );
};
