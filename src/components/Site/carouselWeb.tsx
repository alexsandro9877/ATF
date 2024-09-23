import React from 'react';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { ICarousel } from './type';


  interface IProps {
    data: ICarousel[];
    loadingData: boolean;
  }
  
  const CarouselWeb: React.FC<IProps> = ({ data, loadingData }) => {
    console.log(loadingData);
  
  return (
    <Carousel autoplay>
      {data.map((e, index) => (
        <div key={index}>
          <Image
            src={e.image}
            alt={`Slide ${index + 1}`}
            width="100%"
            height="400px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselWeb;
