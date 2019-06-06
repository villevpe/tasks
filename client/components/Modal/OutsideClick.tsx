import React from 'react'
import ReactDOM from 'react-dom'

export interface OutsideClickProps {
  onOutsideClick: (event: MouseEvent) => void
}

interface Handlers {
  component: EventListener,
  document: EventListener,
}

export class OutsideClick extends React.Component<OutsideClickProps, {}> {

  private clickEventRef: MouseEvent = null
  private element: Element
  private eventHandlers: Handlers

  constructor(props: OutsideClickProps) {
    super(props)
    this.eventHandlers = {
      document: this.onDocumentClick.bind(this),
      component: this.onComponentClick.bind(this)
    }
  }

  componentDidMount() {
    this.element = ReactDOM.findDOMNode(this) as Element

    this.element.addEventListener('click', this.eventHandlers.component)
    document.addEventListener('click', this.eventHandlers.document)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.eventHandlers.document)
    this.element.removeEventListener('click', this.eventHandlers.component)
  }

  onComponentClick(event: MouseEvent) {
    this.clickEventRef = event
  }

  onDocumentClick(event: MouseEvent) {
    if (event !== this.clickEventRef) {
      this.props.onOutsideClick(event)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
