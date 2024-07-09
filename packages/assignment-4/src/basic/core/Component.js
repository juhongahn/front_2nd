/**
 * 재사용을 위한 '코어 컴포넌트' 클래스
 */
import deepEqual from "../../util/deepEqual";

export default class Component {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    this.root.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  setEvent() {}
  setState(newState) {
    if (deepEqual(this.state, newState)) {
      return;
    }
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(type, selector, callback) {
    // 이벤트 위임, 최상단 노드에 이벤트를 걸면 자식 노드들에게도 이벤트가 걸린다.
    this.root.addEventListener(type, (event) => {
      if (!event.target.closest(selector)) return;
      callback(event);
    });
  }
}
