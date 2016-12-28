import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Test extends Component {

  constructor(props) {
    super(props)

    this.state = { expanded: false }

    this.handleClick = this.handleClick.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  handleClick() {
    if (this.state.expanded) {
      this.toggle()
    }

    this.props.onClick()
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  isPass() {
    return this.props.response && this.props.response.pass
  }

  isFail() {
    return this.props.response && !this.props.response.pass
  }

  render() {
    const containerClasses = classnames(
      'snapguidist__test',
      { 'snapguidist__test--pass': this.isPass() },
      { 'snapguidist__test--fail': this.isFail() },
      { 'snapguidist__test--expanded': this.state.expanded },
    )

    const arrowClasses = classnames(
      'snapguidist__arrow',
      { 'snapguidist__arrow--expanded': this.state.expanded },
    )

    return (
      <div className={containerClasses}>
        {this.isFail() &&
          <div>
            <div>
              <button
                className="snapguidist__button"
                disabled={this.props.isFetching}
                onClick={this.handleClick}
              >
                Update
              </button>
              <button
                className="snapguidist__button"
                disabled={this.props.isFetching}
                onClick={this.toggle}
              >
                <span className={arrowClasses}>▼</span>
              </button>
            </div>
            <div>
              <div className="ReactStyleguidist-common__font snapguidist__label">Actual</div>
              <code className="snapguidist__code">{this.props.response.actual}</code>
              <div className="ReactStyleguidist-common__font snapguidist__label">Expected</div>
              <code className="snapguidist__code">{this.props.response.expected}</code>
            </div>
          </div>
        }
      </div>
    )
  }

}

Test.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func,
  response: PropTypes.object,
}

export default Test
