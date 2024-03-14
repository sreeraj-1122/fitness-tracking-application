import React from 'react'
import { Carousel } from 'react-bootstrap'

function Home() {
  return (
    <Carousel >
      <Carousel.Item style={{position:'relative'}}>
       <img src="https://themewagon.github.io/healthcoach/images/bg_1.jpg" alt="" style={{width:'100%',height:'90vh'}} />
        <Carousel.Caption className='text-black ' style={{position:'absolute',left:'0',top:'170px',right:'700px'}}>
          <h3 className='fs-1 text-info '>Welcome Fitness Coach</h3>
          <p className='fs-5'>You can transform health through habit change.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{position:'relative'}}>
        <img src="https://themewagon.github.io/yogalax/images/bg_3.jpg" alt=""  style={{width:'100%',height:'90vh'}}  />
        <Carousel.Caption style={{position:'absolute',left:'0',top:'250px',right:'500px'}}>
          <h3 className='text-success fs-1'>A Fresh approach to healthy life</h3>
          <p className='text-dark fs-4'>Unlock your potential with good nutrition.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  )
}

export default Home