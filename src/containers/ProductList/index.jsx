import React from 'react';

import styles from './style.module.css';

class ProductList extends React.Component {

    render() {
        const { products, attributes } = this.props;
        const items = products.map((item) => {

                let materialVisible = attributes.materials.includes(item.material) ? true : false;
                let colorVisible = attributes.colors.includes(item.color) ? true : false;
                return (
                    <div className={ materialVisible && colorVisible ? styles.productItem : styles.productItemInactive } key={item._id}>
                        <img className={styles.productImage} src={item.image} alt={item.name}/>
                        <p className={styles.productName}>{item.name}</p>
                        <p className={styles.productSku}>SKU: {item.sku}</p>
                        <p className={styles.productPrice}>{(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                );
            }
        );

        return (
            <div className={styles.productWrapper}>
                {items}
            </div>
        );
    }

}

export default ProductList;