# cardname-generator

## What is this?

This is a script that generate a card with a name and a role from a json file. The output image will be in `assets/imgs/output` folder

## How to use

1. Add your json file into `utils/input` folder. Each data should be in this format 

```ts
interface DataInput {
    name: string;
    role?: string;
}
```
and import in `input_data` variable
2. Add your input image into `assets/imgs/input` and write the file name in `input_image` variable
3. Feel free to add you custom fonts in `assets/fonts` folder, and register them in `main.ts` file
4. Start the script typing `npm start` in your terminal
5. The output image will be in `assets/imgs/output` folder
6. The output folder will named after the input_image file name, and images will named after the `name` property in your json file. If it's duplicated, it will be added a number at the end of the name