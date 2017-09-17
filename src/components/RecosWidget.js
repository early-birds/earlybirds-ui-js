import React, { Component } from 'react';
import styles from './RecosWidget.css';
import RecosItem from './RecosItem';

export default class RecosWidget extends Component {
  render() {

    const { recommendations, style } = this.props;
    const ComponentToMount = this.props.children.type;
    const mappedRecommendations =
      recommendations.map((x, i) =>
        <div className={styles.item} key={i}>
          <ComponentToMount product={x.product} />
        </div>
      );

    return (
      <div className={styles.container}>
        {mappedRecommendations}
      </div>
    )
  }
}
