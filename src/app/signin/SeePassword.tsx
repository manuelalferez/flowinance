export const seePassword = () => {
    const ele = document.querySelector('input[type="password"]');
    if (ele) {
      ele.type = "text";
    } else {
      const ele = document.querySelector('input[type="text"]');
      if (ele) ele.type = "password";
    }
}