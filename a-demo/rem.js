new function () {
  var _self = this;
  _self.width = 750;
  _self.fontSize = 100;
  _self.widthProportion = function () {
    var p =
      ((document.body && document.body.clientWidth) ||
        document.getElementsByTagName("html")[0]
          .offsetWidth) / _self.width;
    return p > 1 ? 1 : p < 0.2 ? 0.2 : p;
  };
  _self.changePage = function () {
    var a = _self.widthProportion() * _self.fontSize;
    document
      .getElementsByTagName("html")[0]
      .setAttribute(
        "style",
        "font-size:" + a + "px !important"
      );
    if (
      a !=
      parseFloat(
        window.getComputedStyle(document.documentElement)[
        "fontSize"
        ]
      )
    ) {
      document
        .getElementsByTagName("html")[0]
        .setAttribute(
          "style",
          "font-size:" +
          a /
          (parseFloat(
            window.getComputedStyle(
              document.documentElement
            )["fontSize"]
          ) /
            a) +
          "px !important"
        );
    }
  };
  _self.changePage();
  window.addEventListener(
    "resize",
    function () {
      _self.changePage();
    },
    false
  );
}();