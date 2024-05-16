//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function download(img) {
  let promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.src = img.url;
    console.log("new Image in promise", image);
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
  console.log(promise);
  return promise;
}

function display(loadedImg) {
  output.innerHTML = "";
  loadedImg.forEach((img) => {
    output.append(img);
  });
}

function start() {
  let promises = images.map((img) => {
    return download(img);
  });
  Promise.all(promises)
    .then((loadedImg) => {
      console.log(".then loadedimg", loadedImg);
      display(loadedImg);
    })
    .catch((error) => {
      console.error(error);
    });
}

btn.addEventListener("click", () => {
  start();
});