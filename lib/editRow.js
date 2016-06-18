/**
 * react-native-listview-row-edit
 * https://github.com/pop-xiaodong
 */

'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  LayoutAnimation,
} = require('react-native');

var buttonWidth, buttonHeight;

var EditRow = React.createClass({

  getInitialState() {
    return {
      left: 0,
      stop: 0,
      canMove: true,
    }
  },

  componentWillMount() {
    var {id, editButtonRange} = this.props;

    buttonWidth = editButtonRange.width;
    buttonHeight = editButtonRange.height;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderStart: (event, gestureState) => this.onPanStart(event, gestureState),
      onPanResponderMove: (event, gestureState) => this.onPanMove(event, gestureState),
      onPanResponderEnd: (event, gestureState) => this.onPanEnd(event, gestureState),
    });

  },

  closeRow() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({left: 0, stop: 0});
  },

  onPanStart(event, gestureState) {
    var {id} = this.props;
    this.props.onStart(id, (state) => this.setState({canMove: state}));
  },

  onPanMove(event, gestureState) {

    if (!this.state.canMove) {
      return;
    }

    if (Math.abs(gestureState.dx) < 2 && Math.abs(gestureState.dy) < 2) {
      return;
    }

    if (Math.abs(gestureState.dx)>=Math.abs(gestureState.dy)) {
      var {id} = this.props;
      this.props.onMove(id);
    }

    var dis = this.state.stop + gestureState.dx;

    if (dis > 10) {
      //max left
      this.setState({left: 10});
    } else if (dis < -buttonWidth-10) {
      //max right
      this.setState({left: -buttonWidth-10});
    } else {
      //normal
      this.setState({left: dis});
    }
  },

  onPanEnd(event, gestureState) {
    var justTouch = false;
    var isOpen = false;
    if (this.state.left == 0 && Math.abs(gestureState.dx) <= 2) {
      justTouch = true;
    }
    //Animated
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    if (this.state.left > -buttonWidth/2 || Math.abs(gestureState.dx) <= 2) {
      this.setState({stop: 0, left: 0});
    } else {
      isOpen = true;
      this.setState({stop: -buttonWidth, left: -buttonWidth});
    }
    var {id} = this.props;
    this.props.onMoveEnd(id, justTouch, isOpen);
  },

  render () {
    var {id, editText, editButtonColor, editTextColor} = this.props;
    return (
        <View style={styles.container}>
          <View style={[styles.cancelButton, {backgroundColor: editButtonColor}]}>
            <TouchableOpacity onPress={() => this.props.onEdit(id)}>
              <View style={[styles.cancelView, {width: buttonWidth, height: buttonHeight}]}>
                <Text style={[styles.cancelText, {color: editTextColor}]}>{editText}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{left: this.state.left}}
            {...this._panResponder.panHandlers} {...this.props}
            >
          </View>
          {this.props.boundView && this.props.boundView()}
        </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
  },
  cancelView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 17,
  },
});

module.exports = EditRow;
