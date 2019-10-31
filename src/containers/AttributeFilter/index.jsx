import React, { Fragment } from 'react';

import styles from './style.module.css';

class AttributeFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attributeSelected: ''
        }
    }

    handleAttribute(attribute) {
        this.setState({ attributeSelected: attribute });
    }

    render() {
        const { attributes, hasProduct, visible, handleOption } = this.props;
        let materialList = [];
        let colorList = [];

        if (attributes.materials && attributes.colors) {
            materialList = attributes.materials.map((item) => {
                    let itemHasProduct = hasProduct.materials.includes(item._id) ? false : true;
                    let itemVisible = visible.materials.includes(item._id) ? true : false;
                    return (
                        <label key={item._id}>
                            <input type="checkbox" disabled={itemHasProduct} checked={itemVisible} value={item._id} onChange={e => handleOption(e, 'materials')} />
                            <span>{item.name} {itemHasProduct}</span>
                        </label>
                    );
                }
            );

            colorList = attributes.colors.map((item) => {
                    let itemHasProduct = hasProduct.colors.includes(item._id) ? false : true;
                    let itemVisible = visible.colors.includes(item._id) ? true : false;
                    return (
                        <label key={item._id}>
                            <input type="checkbox" disabled={itemHasProduct} checked={itemVisible} value={item._id} onChange={e => handleOption(e, 'colors')} />
                            <span>{item.name} {itemHasProduct}</span>
                        </label>
                    );
                }
            );
        }

        return (
            <Fragment>
                <div className={styles.attributeWrapper}>
                    <button className={ this.state.attributeSelected === 'materials' ? styles.attributeButtonSelected : styles.attributeButton } onClick={() => this.handleAttribute('materials')}>Materiais</button>
                    <button className={ this.state.attributeSelected === 'colors' ? styles.attributeButtonSelected : styles.attributeButton } onClick={() => this.handleAttribute('colors')}>Cores</button>
                </div>
                <div className={styles.optionWrapper}>
                    <div className={ this.state.attributeSelected === 'materials' ? styles.optionGroupSelected : styles.optionGroup }>
                        {materialList}
                    </div>
                    <div className={ this.state.attributeSelected === 'colors' ? styles.optionGroupSelected : styles.optionGroup }>
                        {colorList}
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default AttributeFilter;