import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { 
  conversasUsuarioFetch 
} from '../actions/AppActions';

class Conversas extends Component {
 
  componentWillMount() {
    this.props.conversasUsuarioFetch();
    this.criaFonteDeDados(this.props.conversas);
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.conversas);
  }

  criaFonteDeDados(conversas) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.dataSource = ds.cloneWithRows(conversas);
  }

  renderRow(conversa) {
    return (
      <TouchableHighlight
        onPress={() => Actions.conversa({
          title: conversa.nome, 
          contatoNome: conversa.nome, 
          contatoEmail: conversa.email })}
      >
        <View style={styles.viewRow}>
          <Text style={styles.textView}>{conversa.nome}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  viewRow: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#CCC'
  },
  textView: {
    fontSize: 25
  }
});

const mapStateToProps = state => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return { ...val, uid };
  });

  return {
    conversas
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  conversasUsuarioFetch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conversas);
