import { h, Component } from 'preact';

export const CloneElement = (BaseComponent, datas) => {
  let newProps = {
    ...BaseComponent.attributes,
    children: BaseComponent.children,
    ...datas
  }
  return props => {
    newProps = {
      ...newProps,
      ...props
    }
    return <BaseComponent.nodeName {...newProps} />
  }
}



