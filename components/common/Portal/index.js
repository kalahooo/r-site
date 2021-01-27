import React from "react";
import ReactDOM from "react-dom";

export default class Portal extends React.Component {
  modalRoot = window.document.body;

  scrollWidth = window.innerWidth - document.documentElement.clientWidth;

  static defaultProps = {
    scrollable: false
  };

  constructor(props) {
    super(props);
    this.el = window.document.createElement("div");
  }

  componentDidMount() {
    // Элемент портала добавляется в DOM-дерево после того, как
    // потомки компонента Modal будут смонтированы, это значит,
    // что потомки будут монтироваться на неприсоединённом DOM-узле.
    // Если дочерний компонент должен быть присоединён к DOM-дереву
    // сразу при подключении, например, для замеров DOM-узла,
    // или вызова в потомке 'autoFocus', добавьте в компонент Modal
    // состояние и рендерите потомков только тогда, когда
    // компонент Modal уже вставлен в DOM-дерево.
    this.modalRoot.appendChild(this.el);
    if (!this.props.scrollable) {
      window.document.body.style.overflow = "hidden";
      window.document.body.style.paddingRight = this.scrollWidth + "px";
    }
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    if (!this.props.scrollable) {
      window.document.body.style.overflow = "initial";
      window.document.body.style.paddingRight = 0;
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
