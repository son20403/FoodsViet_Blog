import React from 'react';
import ItemImage from '../ItemImage';
import ListWrapItem from '../common/ListWrapItem';

const ListCustomer = () => {
    return (
        <ListWrapItem>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Nguyen Truong Son'}></ItemImage>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Nguyen Van Hoai'}></ItemImage>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Le Van Minh Thu'}></ItemImage>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Nguyen Van Chuong'}></ItemImage>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Nguyen Tan Luc'}></ItemImage>
            <ItemImage image={'https://anduc.edu.vn/hinh-anh-hoat-hinh-dep-nhat/imager_7_36042_700.jpg'} title={'Trinh Sang'}></ItemImage>
        </ListWrapItem>
    );
};

export default ListCustomer;