import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Popup extends Component {
  ref = null;
  detectCloseInterval = null;

  constructor(props) {
    super(props);

    if (props.open) {
      this.openWindow(props);
    }
  }

  openWindow(props = this.props) {
    this.ref = window.open(
      props.href,
      props.title,
      props.features,
    );

    this.setCallbacks();
  }

  setCallbacks() {
    this.ref.onload = () => {
      clearInterval(this.detectCloseInterval);
      this.onLoad();
    };

    this.ref.onfocus = () => {
      this.onFocus();
    };

    this.ref.onblur = () => {
      this.onBlur();
    };

    // Use `onunload` instead of `onbeforeunload` which is not supported in IOS Safari.
    this.ref.onunload = () => {
      this.onUnload();

      const interval = setInterval(() => {
        if (this.ref.onload === null) {
          this.setCallbacks();
          clearInterval(interval);
        }
      }, 50);

      this.detectCloseInterval = setInterval(() => {
        if (this.ref.closed) {
          clearInterval(this.detectCloseInterval);
          this.onClose();
        }
      }, 50);
    };
  }

  closeWindow() {
    if (this.ref) {
      if (!this.ref.closed) {
        this.ref.close();
      }
      this.ref = null;
    }
  }

  focusWindow() {
    if (this.ref && !this.ref.closed) {
      this.ref.focus();
    }
  }

  blurWindow() {
    if (this.ref && !this.ref.closed) {
      this.ref.blur();
    }
  }

  onLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  onUnload = () => {
    if (this.props.onUnload) {
      this.props.onUnload();
    }
  }

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.ref) {
      this.openWindow(nextProps);
    }

    if (this.props.open && !nextProps.open) {
      this.closeWindow();
    }

    if (!this.props.focus && nextProps.focus) {
      this.focusWindow();
    }

    if (this.props.focus && !nextProps.focus) {
      this.blurWindow();
    }

    if (this.props.href !== nextProps.href) {
      this.ref.location.href = nextProps.href;
    }
  }

  componentWillUnmount() {
    this.closeWindow();
  }

  render() {
    return null;
  }
}

Popup.propTypes = {
  open: PropTypes.bool,
  focus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  onClose: PropTypes.func,
  href: PropTypes.string.isRequired,
  features: PropTypes.string,
};
