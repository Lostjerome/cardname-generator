import { Canvas, Image, createCanvas, loadImage, registerFont } from "canvas";
import { DataInput } from "./types/data_input";
import fs = require("fs");
import input_data = require("./utils/input/example.json");
const input_image = `example.png`;

registerFont("./assets/fonts/Kanit/Kanit-Medium.ttf", { family: "Kanit" });

loadImage(`./assets/imgs/input/${input_image}`).then((image: Image) => {
    let count = 0;
    try {
        const textX: number = image.width / 2;
        const textY: number = image.height / 2;
        input_data.forEach((info: DataInput) => {
            const canvas: Canvas = createCanvas(image.width, image.height);
            // Create a new canvas element
            const ctx = canvas.getContext("2d");
            // Draw the image onto the canvas
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // Set the font and text color
            ctx.font = "bold 250px Kanit";
            ctx.fillStyle = "black";
            // Set the text alignment to be in the center of the image
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Write the text onto the canvas at a specific position
            ctx.fillText(`${info.name}`, textX, textY);
            // Convert the canvas to a PNG buffer
            const buffer: Buffer = canvas.toBuffer("image/png");
            // Save the buffer to the output file path
            // Create the output folder if it doesn't exist
            if (
                !fs.existsSync(
                    `./assets/imgs/output/${input_image.split(".")[0]}`
                )
            )
                fs.mkdirSync(
                    `./assets/imgs/output/${input_image.split(".")[0]}`
                );
            // Repeats the duplicate name with number of times to avoid overwriting
            if (
                fs.existsSync(
                    `./assets/imgs/output/${input_image.split(".")[0]}/${
                        info.name
                    }.png`
                )
            ) {
                // Count the number of times the name is repeated
                let repeat = 1;
                while (
                    fs.existsSync(
                        `./assets/imgs/output/${input_image.split(".")[0]}/${
                            info.name
                        }(${repeat}).png`
                    )
                ) {
                    repeat++;
                }
                info.name = `${info.name}(${repeat})`;
            }
            fs.writeFileSync(
                `./assets/imgs/output/${input_image.split(".")[0]}/${
                    info.name
                }.png`,
                buffer
            );
            count++;
        });
        console.log(
            `Done! Check the output folder.\n Total: ${count} images created.`
        );
    } catch (err) {
        console.log(err.message);
    }
});
