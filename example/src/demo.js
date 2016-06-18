/**
 * react-native-listview-row-edit
 * https://github.com/pop-xiaodong
 */

'use strict';

var React = require('react');
var {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  RefreshControl,
} = require('react-native');

var ListViewEdit = require('react-native-listview-row-edit');

var rowData = [
  {id: 1, name_en: 'Captain America', source: require('./img/1.jpg')},
  {id: 2, name_en: 'Iron Man', source: require('./img/2.jpg')},
  {id: 3, name_en: 'Thor', source: require('./img/3.jpg')},
  {id: 4, name_en: 'Hulk', source: require('./img/4.jpg')},
  {id: 5, name_en: 'Hawkeye', source: require('./img/5.jpg')},
  {id: 6, name_en: 'Black Widow', source: require('./img/6.jpg')},
  {id: 7, name_en: 'Quicksilver', source: require('./img/7.jpg')},
  {id: 8, name_en: 'Scarlet Witch', source: require('./img/8.jpg')},
  {id: 9, name_en: 'Vision', source: require('./img/9.jpg')},
];

var Demo = React.createClass({

  getInitialState() {
    return {
      isRefresh: false,
    }
  },

  componentWillUnmount() {
    this.timer && this.timer.remove();
  },

  render() {
    return (
      <View style={styles.container}>
        <ListViewEdit
          style={styles.container}
          rowData={rowData}
          refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={this.onRefresh}
                tintColor="gray"
                title="Loading..."
              />
            }
          renderRow={(rowData) => this._renderRow(rowData)}
          boundView={() => this._renderBound()}
          onEdit={(id, rowData, closeRowCallback) => Alert.alert(
            `id: ${id}`,
            `${rowData.name_en}`,
            [
              {text: 'cancel', onPress: () => console.log('cancel')},
              {text: 'ok', onPress: () => closeRowCallback()},
            ]
          )}
          onTouch={(id, rowData) => Alert.alert(`Touch: ${rowData.name_en}   ID: ${id}`)}
          editButtonRange={{width: 80, height: 80}}
          editButtonColor='red'
          editText='设置'
          editTextColor='white'
          />
      </View>
    )
  },

  _renderRow(rowData) {
    return (
      <View style={{flex: 1, height: 80, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10}}>
        <Image style={{height: 70, width: 70}} source={rowData.source}/>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontSize: 16, color: '#6495ed'}}>{'id:' + ' ' + rowData.id}</Text>
          <Text style={{fontSize: 18, color: '#6495ed'}}>{rowData.name_en}</Text>
        </View>
      </View>
    )
  },

  _renderBound() {
    return (
      <View style={{height: 1, backgroundColor: 'silver'}}></View>
    )
  },

  onRefresh() {
    this.setState({isRefresh: true});
    this.timer = setTimeout(
      () => {this.setState({isRefresh: false})},
      2000
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Demo;
