const $ = (q, selectAll = true) =>
  selectAll ? document.querySelectorAll(q) : document.querySelector(q);

window.onload = () => {
  console.log("ready...");
  const bitCheckboxes = $("input.bit-inp:not(:last-child)");
  const confirmInput = $("input.bit-inp:last-child", false);
  const passwordInput = $("#password-inp", false);
  const form = $("form", false);

  console.log(confirmInput);

  confirmInput.onclick = () => {
    const binaryString = [...bitCheckboxes]
      .map((c) => (c.checked ? "1" : "0"))
      .join("");

    if (binaryString === "0001000") {
      passwordInput.value = passwordInput.value.substr(
        0,
        passwordInput.value.length - 1
      );
    } else {
      const result = binaryToString(binaryString);
      passwordInput.value += result;
    }

    setTimeout(() => form.reset(), 100);
  };
};

const binaryToString = (binaryString) => {
  return String.fromCharCode(parseInt(binaryString, 2));
};
