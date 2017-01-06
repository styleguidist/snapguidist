import { createElement, Component } from 'react'
import StyleGuideRenderer from 'react-styleguidist/src/rsg-components/StyleGuide/StyleGuideRenderer'
import { snapguidistShape, snapguidistFactory } from '../queue'

export default class SnapguidistStyleGuideRenderer extends Component {

  getChildContext() {
    return {
      snapguidist: this.snapguidist,
    }
  }

  componentWillMount() {
    this.snapguidist = snapguidistFactory()
  }

  render() {
    return createElement(StyleGuideRenderer, this.props)
  }
}

SnapguidistStyleGuideRenderer.childContextTypes = {
  snapguidist: snapguidistShape,
}
