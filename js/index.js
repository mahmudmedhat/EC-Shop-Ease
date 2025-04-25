




  // إضافة سرعة تحكم في الحركة إذا أردت تغيير السرعة
const images = document.querySelectorAll('.train-image');
images.forEach((img, index) => {
  img.style.animationDuration = `${4 + index * 1}s`; // يختلف السرعة لكل صورة
});
