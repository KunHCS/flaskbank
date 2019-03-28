import React from 'react';
import BGimg from '../../images/bg.jpeg';
import slide1 from  '../../images/IMG_1055.jpeg';
import slide2 from  '../../images/002.jpeg';
import slide3 from  '../../images/001.jpeg';

const Left = () => {
  const styleLeft = {
    backgroundColor: '#5F5F5F',
    height:'auto',
    width: '30%',
    opacity: '0.98',
    float: 'left',
    borderRadius: '10px 10px 10px 10px',
    border: '2px solid blue',
  }

  const text1 = {
    paddingTop: '10px',
    font: 'Helvetica',
    position: 'flex',
    color: 'white',
    fontSize: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 30px 60px 0 rgba(0,0,255,0.3)',
    paddingBottom: '30px',
  }
  const text2 = {
    display: "block",
    lineHeight: '150%',
    font: 'Helvetica',
    position: 'flex',
    color: 'white',
    fontSize: '25px',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: '20px',
    boxShadow: '30 30 0 30 rgba(0,0,255,0.3)',
  }
  const text3 = {
    lineHeight: '130%',
    font: 'Helvetica',
    position: 'flex',
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
  }

  const center3 = {
    marginLeft: '9px',
    position: 'flex',
    height:'90%',
    width: '95%',
    opacity: '0.98',
    textAlign: 'center',
    WebkitBorderRadius:'5px 5px 5px 5px',
    boxShadow: '5px 1px 5px, 5px 1px 5px',
    border: '1px',
    color: '#e6f2ff',
  }

  return (
    <div className ="LeftContainer" style={styleLeft} >
      <p style = {text1}> SJSP CREDIT CARDS</p>
      <p style = {text2}> Explore SJSP and Its Benefits </p>
      <p style = {text3}> Whether you're a frequent credit card or first-time
        credit card user, SJSP has various options card to meet your needs. </p>
      <p> <img src={slide3} alt="card" style = {center3}/> </p>
      <p> <img src={slide2} alt="card" style = {center3}/> </p>
      <p> <img src={slide1} alt="card" style = {center3}/> </p>
    </div>

  );
}


const Right = (props) => {

  const styleRight = {
    backgroundColor: '#797979',
    height:'auto',
    width: '70%',
    opacity: '0.98',
    borderRadius: '10px 10px 10px 10px',
    border: '2px solid blue',
  }

  return (
    <div className ="RightContainer" style={styleRight}>
      {props.children}
    </div>
  );
}

const Container = (props) => {
  const containerStyle = {
    backgroundImage: "url(" + BGimg + ")",
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    minHeight:'100%',
    width:'100%',
    display: 'flex',
    position: 'absolute',
    minWidth: '100%',

  }

  return (
    <div className ="container" style ={containerStyle}>
      <Left/>
      <Right>
        {props.children}
      </Right>
    </div>
  );
}

export default Container;