class Loading {
  constructor() {
    this.domElement = null;
    this.props = null;

    this.bootstrap = this.bootstrap.bind(this);
    this.mount = this.mount.bind(this);
    this.unmount = this.unmount.bind(this);
    this.update = this.update.bind(this);
  }

  async bootstrap() {}

  async mount({ props, domElement }) {
    this.props = props;
    this.domElement = domElement;
    this.updateRender();
  }

  async update({ props, domElement }) {
    if (props) this.props = props;
    if (domElement) this.domElement = domElement;
    this.updateRender();
  }

  async unmount() {
    this.domElement.innerHTML = "";
  }

  updateRender() {
    this.domElement.innerHTML = this.render();
  }

  render() {
    const { classNames = "", text = "" } = this.props;

    return `
      <div class="loading ${classNames}">${text}</div>
    `;
  }
}

export default Loading;
