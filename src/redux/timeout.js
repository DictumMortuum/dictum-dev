let timer = null;

export default function (callback) {
  clearTimeout(timer);
  timer = setTimeout(callback, 1000);
}
