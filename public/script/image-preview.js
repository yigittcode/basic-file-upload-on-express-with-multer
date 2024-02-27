const filePickerElement = document.getElementById('image');
const preview_image = document.getElementById('preview-img');
filePickerElement.addEventListener('change', ()=>{
    const files = filePickerElement.files;
    if(!files) {
        preview_image.style.display = 'none';
        return;
    }
    const targetFile = files[0];
    preview_image.src = URL.createObjectURL(targetFile);
    preview_image.style.display = 'block';

})