import Image from 'next/image';
import React from 'react';
import don from '../public/don.jpg';
const page = () => {
  return (
    <div>
      <h1>hello next js</h1>
<Image
src="https://images.unsplash.com/photo-1789758612543-8ba27309db9e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D"
width={500}
height={500}
>

</Image>
    
    </div>
  );
};

export default page;