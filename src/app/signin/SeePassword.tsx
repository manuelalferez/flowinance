export const seePassword = () => {
  const ele = document.querySelector('input[type="password"]') as HTMLInputElement;
  if (ele) 
  {
    ele.type = "text";
  } 
  else
  {
    const ele = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (ele) 
      {
      ele.type = "password";
      }
  }
};