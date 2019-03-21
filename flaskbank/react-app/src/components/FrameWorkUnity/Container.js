// import React from 'react';
// import Pic from '../../images/testImage.png';
// import BGimg from '../../images/bg.jpeg';
// import Pic1 from  '../../images/Slide1.jpg';
// import Pic2 from  '../../images/Slide2.jpg';
// import Pic3 from  '../../images/Slide3.jpg';
// import ImageFadeIn from 'react-image-fade-in'
//
// // const Left = () => {
// //     const styleLeft = {
// //         backgroundColor: '#DFF1FE',
// //         height:'auto',
// //         width: '30%',
// //         textAlign: '-webkit-center',
// //         opacity: '0.3'
// //     }
// //
// //     return (
// //         <div className ="LeftContainer" style={styleLeft} >
// //             <img src={Pic} alt="mypic" style={{width:'15%' ,height:'15%'}}/>
// //         </div>
// //
// //     );
// // }
// //
// // const Right = (props) => {
// //
// //     const styleRight = {
// //         backgroundColor: '#ACF5F4',
// //         height:'auto',
// //         width: '70%',
// //         opacity: '0.3',
// //         textAlign: '-webkit-center',
// //     }
// //
// //     return (
// //         <div className ="RightContainer" style={styleRight}>
// //             {/*<RegisterForm/>*/}
// //             {props.children}
// //         </div>
// //     );
// // }
//
//
//
// const Left = (props) => {
//
//     const styleLeft = {
//         height:'auto',
//         width: '40%',
//         backgroundColor: 'rgba(222,238,249,0.5)',
//         textAlign: '-webkit-center',
//     }
//
//     return (
//       <div className ="LeftContainer" style={styleLeft}>
//           {/*<RegisterForm/>*/}
//           {props.children}
//       </div>
//     );
// }
//
// const Line  = () =>{
//     const lineStyle = {
//         borderLeft: '6px solid black',
//         height: '100%',
//     }
//     return (
//       <div className= "VerticalLine" style = {lineStyle}>
//       </div>
//     )
// }
//
// const Right = () => {
//     const styleRight = {
//         height:'auto',
//         width: '60%',
//         textAlign: '-webkit-right',
//         backgroundColor: 'rgba(222,238,249,0.5)',
//     }
//
//     return (
//       <div className ="RightContainer" style={styleRight} >
//           <text style = {text}> Are you looking for a cardless bank? </text>
//           <img src = {Pic1} alt= "Banking" style={img}/>
//           {/*<img src = {Pic2} alt="2" style={img}/>*/}
//           {/*/!*<div className = "text2"> Or a faster way to deposit and withdraw cash? </div>*!/*/}
//           {/*<img className= "3" src = {Pic3} alt="1" style={img}/>*/}
//           {/*<div> className = "text3"> Look no more, sign up now! </div>*/}
//       </div>
//     );
// }
// const text = {
//   font: 'Helvetica',
//   position: 'absolute',
//   justifyContent: 'bottom',
//   paddingLeft: '20px',
//   paddingRight: '20px',
//   paddingBottom: '35px',
//   color: 'white',
//   fontSize: '45px',
//   bottom: '0',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   boxShadow: '0 30px 60px 0 rgba(0,0,255,0.3)',
// }
// const img = {
//    position:'reflexive',
//    height:'69%',
//    width: '100%',
//    margin: 'right',
//    boxShadow: '0 30px 60px 0 rgba(0,0,255,0.3)',
//    // borderRadius: '10px 10px 10px 10px',
// }
//
// const Container = (props) => {
//
//     const containerStyle = {
//         backgroundImage: "url(" + BGimg + ")",
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         minHeight: '100%',
//         width: '100%',
//         display: 'flex',
//         position: 'absolute',
//         minWidth: '100%',
//     }
//
//     return (
//         <div className ="container" style ={containerStyle}>
//             <Left>
//             {props.children}
//             </Left>
//             <Line/>
//             <Right/>
//         </div>
//     );
// }

//export default Container;

import React from 'react';
import Pic from '../../images/testImage.png';
import BGimg from '../../images/bg.jpeg';
import card from  '../../images/card.png';
import card2 from  '../../images/card2.png';
import card3 from  '../../images/card3.png';
import slide1 from  '../../images/Slide3.jpg';
import slide2 from  '../../images/Slide2.jpg';
import slide3 from  '../../images/Slide1.jpg';

const Left = () => {
  const styleLeft = {
    backgroundColor: '#5F5F5F',
    height:'auto',
    width: '30%',
    // textAlign: '-webkit-left',
    opacity: '0.98'
  }

  const text1 = {
    paddingTop: '10px',
    font: 'Helvetica',
    position: 'flex',
    color: 'white',
    fontSize: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    display: "block",
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
    paddingBottom: '30px',
    boxShadow: '30 30 0 30 rgba(0,0,255,0.3)',
  }
  const text3 = {
    lineHeight: '150%',
    font: 'Helvetica',
    position: 'flex',
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
  }
  const center3 = {
    marginLeft: '10px',
    paddingTop: '3px',
    position: 'flex',
    height:'100%',
    width: '95%',
    opacity: '0.98',
    textAlign: 'center',
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
    paddingBottom: '40px',
  }
  const center = {
    margin: '0',
    position: 'absolute',
    paddingTop: '15px',
    whiteSpace: 'nowrap',
    paddingLeft:'150px',
    paddingBottom: '30px',
    height:'30%',
    width: '35%',
    opacity: '0.98'
  }
  const center2 = {
    margin: '50px',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft:'200px',
    paddingBottom: '30px',
    height:'30%',
    width: '40%',
    opacity: '0.98'
  }
  const center3 = {
    margin: '100px',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft:'250px',
    paddingBottom: '30px',
    height:'30%',
    width: '45%',
    opacity: '0.98'
  }
  const para = {
    paddingTop: '450px',
    position: 'relative',
  }
  const form = {
    textAlign: '-webkit-center',
  }

  return (
    <div className ="RightContainer" style={styleRight}>
      <div> <img src={card} alt="card" style = {center}/> </div>
      <div> <img src={card2} alt="card" style = {center2}/> </div>
      <div> <img src={card3} alt="card" style = {center3}/> </div>

      {/*<RegisterForm/>*/}
      <p style = {para} />
      <div style={form} >{props.children}</div>
    </div>

  );
}


// url('../images/bg.jpeg')
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