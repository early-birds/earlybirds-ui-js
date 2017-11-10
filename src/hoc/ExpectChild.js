import { h, Component } from 'preact';
// expect child should have same props as BaseComponent
// BaseComponent should not adapt to what expect child does

// ExpectChild is a higher order component that once applied to a component,
// Expect at least a 'component' OR 'children' props.
// If none of these props are provided, display warning and doesnt return anything.
//
// Use case: I have a component that expect another component via 'props' (component)
// or children and I don't want to deal with all the checks
export const ExpectChild = BaseComponent => {
  return class extends Component {
    constructor(props) {
      const { children, component } = props;
      super(props);
      if (children.length > 1) {
        throw ("Expect only one child");
      }
      else if (children.length === 0 && !component) {
        throw (BaseComponent.name + " : Expect child element or component props");
      }
    }
    render() {
      const { children, ...rest } = this.props;
      let childElement = children.length == 1 ? children : this.props.component;
      if (!childElement) return null;
      return (
        <BaseComponent { ...rest } >{ childElement }</BaseComponent>
      )
    }
  }
}
