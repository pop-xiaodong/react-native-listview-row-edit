/**
 * react-native-listview-row-edit
 * https://github.com/pop-xiaodong
 */

var React = require('react');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  ListView,
  Alert,
  TouchableWithoutFeedback,
} = require('react-native');

var EditRow = require('./editRow');

var ListViewEdit = React.createClass({

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.rowData),
      scrollEnabled: true,
      rowId: null,
      hasOpenRow: false,
    }
  },

  render() {
    return (
      <TouchableWithoutFeedback onPressIn={() => this.resetScrollView()}>
        <ListView
          style={this.props.style}
          onScroll={this.onScrolls}
          refreshControl={this.props.refreshControl}
          renderHeader={this.props.renderHeader}
          renderFooter={this.props.renderFooter}
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <EditRow
              id={rowData.id}
              ref={v => this[`editRow_${rowData.id}`] = v}
              boundView={this.props.boundView}
              editButtonRange={this.props.editButtonRange || {width: 80, height: 80}}
              editButtonColor={this.props.editButtonColor || 'red'}
              editText={this.props.editText || 'setting'}
              editTextColor={this.props.editTextColor || 'white'}
              onStart={(id, callback) => this.onStart(id, callback)}
              onMove={(id) => this.onMove(id)}
              onMoveEnd={(id, justTouch, isOpen) => this.onMoveEnd(id, rowData, justTouch, isOpen)}
              onEdit={(id) => this.props.onEdit(id, rowData, () => this.closeRow())}
            >
              {this.props.renderRow && this.props.renderRow(rowData)}
            </EditRow>
          )}>
        </ListView>
      </TouchableWithoutFeedback>
    )
  },

  //listview api
  onScrolls() {
    if (this.state.rowId) {
      this.closeRow(this.state.rowId);
      this.setState({rowId: null});
    }
  },

  //PanResponder
  onStart(id, callback) {
    if (this.state.rowId && this.state.rowId != id) {
      callback(false);
      this.closeRow(this.state.rowId);
      this.setState({hasOpenRow: true, rowId: null});
    } else {
      callback(true);
    }
  },

  onMove(id) {
    if (this.state.scrollEnabled) {
      this.setState({
        scrollEnabled: false,
        rowId: id,
      });
    }
  },

  onMoveEnd(id, rowData, justTouch, isOpen) {
    if (justTouch && !this.state.hasOpenRow) {
      this.props.onTouch(id, rowData);
    }

    if (!this.state.scrollEnabled && !isOpen) {
      this.setState({scrollEnabled: true});
    }
    if (!isOpen) {
      this.setState({hasOpenRow: false, rowId: null});
    }
  },

  resetScrollView() {
    var {scrollEnabled} = this.state;
    if (scrollEnabled) {
      return;
    }
    this.setState({scrollEnabled: true, rowId: null});
    this.closeRow();
  },

  closeRow(rowId) {
    var editRowView = this[`editRow_${this.state.rowId}`];
    editRowView.closeRow();
    this.setState({scrollEnabled: true, rowId: null});
  },

});

var styles = StyleSheet.create({
  //
});

module.exports = ListViewEdit;
