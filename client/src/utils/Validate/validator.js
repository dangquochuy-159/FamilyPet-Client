const Validator = (options) => {
  function getParent(ele, selector) {
    while (ele.parentElement) {
      if (ele.parentElement.matches(selector)) {
        return ele.parentElement;
      } else {
        ele = ele.parentElement;
      }
    }
  }
  let listRules = {};
  function validate(inputEle, rule) {
    let msgElement = getParent(inputEle, options.formGroup).querySelector(
      options.formError
    );

    let msgError;
    let listRule = listRules[rule.selector];

    for (let itemRule of listRule) {
      switch (inputEle.type) {
        case "radio":
        case "checkbox":
          msgError = itemRule(
            formEle.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          msgError = itemRule(inputEle.value);
      }
      if (msgError) break;
    }
    if (msgError) {
      msgElement.innerText = msgError;
      getParent(inputEle, options.formGroup).classList.add("invalid");
    }

    return !msgError;
  }

  let formEle = document.querySelector(options.form);

  if (formEle) {
    formEle.onsubmit = function (e) {
      e.preventDefault();

      let isFormValid = true;
      options.rules.forEach((rule) => {
        let inputEle = document.querySelector(rule.selector);
        let isValid = validate(inputEle, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        if (typeof options.onRegister === "function") {
          let enableInputs = formEle.querySelectorAll("[name]");
          let valueInput = Array.from(enableInputs).reduce((values, input) => {
            switch (input.type) {
              case "radio":
                if (input.matches(":checked")) {
                  values[input.name] = input.value;
                }
                break;
              case "checkbox":
                if (input.matches(":checked")) {
                  if (Array.isArray(values[input.name])) {
                    values[input.name].push(input.value);
                  } else {
                    values[input.name] = [input.value];
                  }
                }
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          }, {});
          options.onRegister(valueInput);
        }
      }
    };

    options.rules.forEach((rule) => {
      if (Array.isArray(listRules[rule.selector])) {
        listRules[rule.selector].push(rule.test);
      } else {
        listRules[rule.selector] = [rule.test];
      }

      let inputEles = formEle.querySelectorAll(rule.selector);
      Array.from(inputEles).forEach((inputEle) => {
        inputEle.onblur = function () {
          validate(inputEle, rule);
        };
        inputEle.oninput = function () {
          let msgElement = getParent(inputEle, options.formGroup).querySelector(
            options.formError
          );
          msgElement.innerText = "";
          getParent(inputEle, options.formGroup).classList.remove("invalid");
        };
      });
    });
  }
}
Validator.isRequired = function (selector, isEmpty) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : isEmpty;
    },
  };
};
Validator.isEmail = function (selector, isEmail) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : isEmail;
    },
  };
};
Validator.isMinLength = function (selector, minPass, isPass) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= minPass ? undefined : isPass;
    },
  };
};
Validator.isConfirmed = function (selector, confirmPass, isConfirmPass) {
  return {
    selector: selector,
    test: function (value) {
      return value === confirmPass() ? undefined : isConfirmPass;
    },
  };
};

export default Validator
