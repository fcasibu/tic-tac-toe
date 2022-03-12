const players = (() => {
  class Player {
    constructor(name, mark) {
      this.name = name;
      this.mark = mark;
    }
  }
  return { Player };
})();

export default players;
