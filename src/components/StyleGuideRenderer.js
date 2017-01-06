import { createElement, Component } from 'react'
import StyleGuideRenderer from 'react-styleguidist/src/rsg-components/StyleGuide/StyleGuideRenderer'
import { snapguidistShape, snapguidistContextFactory } from '../context'

export default class SnapguidistStyleGuideRenderer extends Component {

  getChildContext() {
    return {
      snapguidist: this.snapguidist,
    }
  }

  componentWillMount() {
    this.snapguidist = snapguidistContextFactory()
  }

  render() {
    return createElement(StyleGuideRenderer, this.props)
  }
}

SnapguidistStyleGuideRenderer.childContextTypes = {
  snapguidist: snapguidistShape,
}
