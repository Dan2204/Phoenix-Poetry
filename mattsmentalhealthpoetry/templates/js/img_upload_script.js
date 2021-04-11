let input_pic = document.getElementById('img-upload');
let img_txt = document.getElementById('img-txt');
let edit_img_txt = document.getElementById('edit-img-txt');

input_pic.addEventListener("change", (e) => {
  if (input_pic.value) {
    style_image = document.getElementById('on-post-image');
    style_image.style.color = "#17A2B8";
    let pic_val = input_pic.value.split("\\");
    pic_val = pic_val[pic_val.length - 1];
    if(pic_val.length > 19) {
      pic_file_type = pic_val.slice(pic_val.length - 4);
      pic_val = pic_val.slice(0, 14) + ".. " + pic_file_type;
    }
    img_txt.childNodes[0].nodeValue = "Image Added:";
    img_txt.childNodes[2].nodeValue = " " + pic_val;
    if (edit_img_txt) {
        edit_img_txt.childNodes[0].nodeValue = "(Replacing image)";
    }
  } else {
    style_image = document.getElementById('on-post-image');
    style_image.style.color = "#ccc";
    style_image.style.textShadow = "0px 0px 0px inherit";
    img_txt.childNodes[0].nodeValue = "Add Image: ";
    img_txt.childNodes[2].nodeValue = "";
    if (edit_img_txt) {
        edit_img_txt.childNodes[0].nodeValue = "(Leave to keep current image)";
    }
  }
});
