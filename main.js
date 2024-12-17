const $ = (q, selectAll = false) =>
  selectAll ? document.querySelectorAll(q) : document.querySelector(q);

window.onload = () => {
  console.log("ready...");

  const bitCheckboxes = $("input.bit-inp:not(:last-child)", true);
  const confirmInput = $("input.bit-inp:last-child");
  const hintText = $("div.hint-text");
  const passwordInput = $("#password-inp");
  const form = $("form");
  let hintMessage = { message: ".", isError: false };

  confirmInput.onclick = () => {
    const binaryString = [...bitCheckboxes]
      .map((c) => (c.checked ? "1" : "0"))
      .join("");

    if (isBackspaceKey(binaryString)) {
      passwordInput.value = removeLastCharacter(passwordInput.value);
      hintMessage = getPasswordValidationResult(passwordInput.value);
    } else if (isEnterKey(binaryString)) {
      if (isPasswordCorrectLength(passwordInput.value)) {
        hintMessage.message = "Your password has been succesfully chosen";
      }
    } else {
      passwordInput.value += binaryToString(binaryString);
      hintMessage = getPasswordValidationResult(passwordInput.value);
    }

    updateHintText(hintText, hintMessage);

    setTimeout(() => form.reset(), 100);
  };
};

const updateHintText = (hintTextElement, hintMessage) => {
  if (hintMessage.isError) {
    hintTextElement.classList.add("error");
  } else {
    hintTextElement.classList.remove("error");
  }

  hintTextElement.innerHTML = hintMessage.message;
};

const removeLastCharacter = (inputString) => {
  return inputString.substr(0, inputString.length - 1);
};

const isBackspaceKey = (inputString) => inputString === "0001000";
const isEnterKey = (inputString) => inputString === "0001101";

const getPasswordValidationResult = (passwordString) => {
  if (isPasswordCorrectLength(passwordString)) {
    return { isError: false, message: "." };
  }

  return {
    isError: true,
    message: "Password must be 5 or more characters long",
  };
};

const isPasswordCorrectLength = (passwordString) => {
  return passwordString.length >= 5;
};

const binaryToString = (binaryString) => {
  return String.fromCharCode(parseInt(binaryString, 2));
};
