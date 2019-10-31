import React from 'react';

import ProductList from '../ProductList';
import AttributeFilter from '../AttributeFilter';

class ProductDisplay extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            productList: [],
            attributeList: [],
            attributeHasProduct: [],
            attributeVisible: []
        }

        this.handleAttributes = this.handleAttributes.bind(this);
    }

    handleAttributes(e, attribute) {
        const { attributeVisible } = this.state;
        let itemVisible = false;
        for(let i = 0; i < attributeVisible[attribute].length; i++){
            if (attributeVisible[attribute][i] === e.target.value) {
                attributeVisible[attribute].splice(i, 1);
                itemVisible = true;
            }
        }

        if (!itemVisible) {
            attributeVisible[attribute].push(e.target.value);
        }

        this.setState({ attributeVisible: attributeVisible });
    }

    componentDidMount () {
        fetch('http://localhost:3000/products/', {
            method: 'GET'
        })
        .then(res => {
            if (res.status !== 200) {
                console.log('Products not found');
            } else {
                res.json().then(data => {
                    let materials = [];
                    let colors = [];

                    data.forEach(product => {
                        if (!materials.includes(product.material)) {
                            materials.push(product.material);
                        }
                        if (!colors.includes(product.color)) {
                            colors.push(product.color);
                        }
                    });

                    let attributes = {
                        materials: materials,
                        colors: colors
                    };
                    this.setState({ productList: data, attributeHasProduct: attributes, attributeVisible: JSON.parse(JSON.stringify(attributes)) });
                });
            }
        })
        .catch(err => {
            console.log('Products not found');
        });

        fetch('http://localhost:3000/attributes/', {
            method: 'GET'
        })
        .then(res => {
            if (res.status !== 200) {
                console.log('Attributes not found');
            } else {
                res.json().then(data => {
                    this.setState({ attributeList: data });
                });
            }
        })
        .catch(err => {
            console.log('Attributes not found');
        });
    }

    render() {
        return (
            <div>
                <AttributeFilter
                    attributes={this.state.attributeList}
                    hasProduct={this.state.attributeHasProduct}
                    visible={this.state.attributeVisible}
                    handleOption={this.handleAttributes}
                />
                <ProductList
                    products={this.state.productList}
                    attributes={this.state.attributeVisible}
                />
            </div>
        );
    }

}

export default ProductDisplay;