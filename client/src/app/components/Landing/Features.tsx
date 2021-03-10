import React from 'react';
import { Book } from '../Book/Book';

export const Feature = () => {
  return (
    <div className="feature">
      <div className="feature__title">
        <h2 className="feature__title--h2">Featured Product</h2>
        <p className="feature__title--para">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry
        </p>
      </div>
      <div className="feature__list">
        <Book
          imgURL="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/i/bia-sao-17_11-9-2020-1.jpg"
          title="Sword Art Online 17 - Tặng Kèm Bookmark PVC"
          price={106.25}
          old_price={125}
          _id="5f91cb78bb017357906536cb"
        />
        <Book
          imgURL="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_2199.jpg"
          title="Tôi Thấy Hoa Vàng Trên Cỏ Xanh (Bản In Mới - 2018)"
          price={100}
          old_price={125}
          _id="5f92967afee4881711cf0f45"
        />
        <Book
          imgURL="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_10704.jpg"
          title="7 Phương Pháp Đầu Tư Warren Buffet"
          price={108.42}
          old_price={139}
          _id="5f92a2372f69d81ef9ed099d"
        />
        <Book
          imgURL="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/h/thanh-guom-diet-quy-tap-16.jpg"
          title="Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 16: Bất Diệt"
          price={23.75}
          old_price={25}
          _id="5f91cf129bcd585b3e0ef405"
        />
      </div>
    </div>
  );
};
