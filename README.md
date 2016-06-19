# react-native-listview-row-edit
A components like weChat swipe(slide) left to edit.

## Demo
![image](https://github.com/pop-xiaodong/react-native-listview-row-edit/blob/master/example/example.gif)

## Installation
install react-native-listview-row-edit:

```javascript
npm install react-native-listview-row-edit --save
```

## Usage

```js
var ListViewRowEdit = require('react-native-listview-row-edit');

var rowData = [
  {id: 1, name_en: 'Captain America', source: require('./img/1.jpg')},
  {id: 2, name_en: 'Iron Man', source: require('./img/2.jpg')},
  {id: 3, name_en: 'Thor', source: require('./img/3.jpg')},
];

var Demo = React.createClass({
  render() {
    return (
      <ListViewRowEdit
        style={styles.container}
        rowData={rowData}
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
  
  //boundary line
  _renderBound() {
    return (
      <View style={{height: 1, backgroundColor: 'silver'}}></View>
    )
  },
});
```
