const inputImage = document.querySelector("#images-upload");
const imagesContainer = document.querySelector(".load-images-gallery__images-container");


(function init() {
    inputImage.addEventListener("change", selectImage);
})();


function selectImage() {
    const image = this.files[0];
    if(image) {
        const reader = new FileReader();
        reader.addEventListener("load", loadImage);
        reader.readAsDataURL(image);
    }
}
        
function loadImage() {
    if(imagesContainer.children.length < 10) {
        const newImage = new Image();
        newImage.src = this.result;
        imagesContainer.appendChild(newImage);
    } else {
        console.log("error");
    }
    
}