import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Code from './Code'

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
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }))
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
      { 'snapguidist__test--expanded': this.state.expanded }
    )

    const arrowClasses = classnames(
      'snapguidist__arrow',
      { 'snapguidist__arrow--expanded': this.state.expanded }
    )

    return (
      <div className={containerClasses}>
        {this.isFail()
          && (
          <div>
            <div>
              <button
                className="snapguidist__button"
                disabled={this.props.isFetching}
                type="button"
                onClick={this.handleClick}
              >
                Update
              </button>
              <button
                className="snapguidist__button"
                disabled={this.props.isFetching}
                type="button"
                onClick={this.toggle}
              >
                <span className={arrowClasses}>▼</span>
              </button>
            </div>
            <div>
              {this.props.response.diff
                ? <Code diff label="Difference" value={this.props.response.diff} />
                : (
                  <div>
                    <Code label="Actual" value={this.props.response.actual} />
                    <Code label="Expected" value={this.props.response.expected} />
                  </div>
                )
              }
            </div>
          </div>
          )
        }
      </div>
    )
  }
}

Test.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func,
  response: PropTypes.shape({
    actual: PropTypes.string,
    count: PropTypes.number,
    diff: PropTypes.string,
    expected: PropTypes.string,
    pass: PropTypes.bool,
  }),
}

export default Test
