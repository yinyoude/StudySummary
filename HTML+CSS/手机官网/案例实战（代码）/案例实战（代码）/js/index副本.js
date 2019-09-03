
var getByClass = function (className) {
  return document.getElementsByClassName(className);
}
var addClass = function (element , _className) {
  
  var className = element.className.split(' ');
  var classNameMap = {}

          for(var i=0;i<className.length;i++){ // 基本代码，需要优化
            classNameMap[ className[i]] = 1;
          }
          classNameMap[_className] = 1;

          className = [];
          for(i in classNameMap){
            className.push(i);
          }
          element.className = className.join(' ');

          // element.className += (' '+className ); 错误示例
        }
        var removeClass = function (element ,  _className) {

          var className = element.className.split(' ');
          var classNameMap = {}
          for(var i=0;i<className.length;i++){ // 基本代码，需要优化
            classNameMap[ className[i]] = 1;
          }
          delete classNameMap[_className];
          className = [];
          for(i in classNameMap){
            className.push(i);
          }
          element.className = className.join(' ');
          // element.className =  element.className.replace(className,'');
        }


        setTimeout(function  () {getByClass('screen-1__subheading')[0].style.opacity =1;},1000);
        
        window.onscroll = function () {
          
          var top  = document.body.scrollTop;

            //   顶部菜单栏的设置
            if( top < 100 ){
              removeClass( getByClass('header')[0] , 'header_status_white' );
              getByClass('outline')[0].style.opacity=0;


            }else{
              addClass( getByClass('header')[0] , 'header_status_white' ) ;
              mouseEnterTip(getByClass('header__nav-item')[0]);
              getByClass('outline')[0].style.opacity=1;

            }

            //  第二屏的初始设置
            // getByClass('screen-2__subheading')[0].style.opacity =0;
            // getByClass('screen-2__tip')[0].style.opacity = 0;
            // getByClass('screen-2__sub-1')[0].style.opacity = 0;
            // getByClass('screen-2__sub-2')[0].style.opacity = 0;


            //  滚动后第二屏幕的设置
            // if(top > 340){
              
            //   getByClass('screen-2__heading')[0].style.opacity = 1;
            //   getByClass('screen-2__heading')[0].style.animation = 'fadeInUp 1s';

            //   getByClass('screen-2__subheading')[0].style.animation = 'fadeInUp 1s .5s';
            //   getByClass('screen-2__sub-2')[0].style.animation = 'bounceInUp 1s 1.5s';
            
            //   setTimeout(function  () {

            //     getByClass('screen-2__subheading')[0].style.opacity =1;

            //     getByClass('screen-2__tip')[0].style.transition = 'all 1s'; // 为 tip 增加过渡动画
            //     getByClass('screen-2__tip')[0].style.opacity = 1;

            //     getByClass('screen-2__sub-1')[0].style.transition = 'all 1s';
            //     getByClass('screen-2__sub-1')[0].style.opacity = 1;

            //   },1000);

            //   setTimeout(function  () {
            //     getByClass('screen-2__sub-2')[0].style.opacity = 1;
            //   },2000);

            // }
            //  不断的滚动后，会有动画的BUG，我们换成用 className的

            if(top>340){
              addClass(getByClass('screen-2__heading')[0],'screen-2__heading_status_load');
              addClass(getByClass('screen-2__subheading')[0],'screen-2__subheading_status_load');
              addClass(getByClass('screen-2__tip')[0],'screen-2__tip_status_load');
              addClass(getByClass('screen-2__sub-1')[0],'screen-2__sub-1_status_load');
              addClass(getByClass('screen-2__sub-2')[0],'screen-2__sub-2_status_load');

              mouseEnterTip(getByClass('header__nav-item')[1])
            }

            addClass(getByClass('screen-3')[0],'screen-3_status_init');

            if(top > 340+640){
              //  我们可以首先直接用 screen-2的，这样就是 BEM 开发的好处，结构非常清晰
              addClass(getByClass('screen-3__heading')[0],'screen-3__heading_status_load');
              addClass(getByClass('screen-3__subheading')[0],'screen-3__subheading_status_load');
              addClass(getByClass('screen-3__tip')[0],'screen-3__tip_status_load');
              addClass(getByClass('screen-3__skill')[0],'screen-3__skill_status_load');
              
              setTimeout(function () {
                addClass(getByClass('screen-3')[0],'screen-3_status_load');
              },100)

              mouseEnterTip(getByClass('header__nav-item')[2])
            }

            if(top > 340+640+640){
              addClass(getByClass('screen-4__heading')[0],'screen-4__heading_status_load');
              addClass(getByClass('screen-4__subheading')[0],'screen-4__subheading_status_load');
              addClass(getByClass('screen-4__tip')[0],'screen-4__tip_status_load');


              addClass(getByClass('screen-4__env-item')[0],'screen-4__env-item_staus_load');
              addClass(getByClass('screen-4__env-item')[1],'screen-4__env-item_staus_load');
              addClass(getByClass('screen-4__env-item')[2],'screen-4__env-item_staus_load');
              addClass(getByClass('screen-4__env-item')[3],'screen-4__env-item_staus_load');

              mouseEnterTip(getByClass('header__nav-item')[3])
            }

            addClass(getByClass('screen-5__head')[0],'screen-5__head_status_init');
            if(top > 340+640+640+640){
              addClass(getByClass('screen-5__heading')[0],'screen-5__heading_status_load');
              addClass(getByClass('screen-5__subheading')[0],'screen-5__subheading_status_load');
              addClass(getByClass('screen-5__tip')[0],'screen-5__tip_status_load');
              
              setTimeout(function () {
                addClass(getByClass('screen-5__head')[0],'screen-5__head_status_load');
              },100);

              mouseEnterTip(getByClass('header__nav-item')[4])

            }

          }

          var  moveTip = function(e) {
            var idx = e.target.getAttribute('data-idx');
            getByClass('header__nav-item-tip')[0].style.left = (20+idx*96)+'px';
          }

          var moveScroll = function (e) {
            var idx = e.target.getAttribute('data-idx');
            document.body.scrollTop = (idx*640)
          }
          var mouseEnterTip = function (element) {
            var e = document.createEvent('MouseEvents');
            e.initEvent( 'mouseenter', true, false );
            element.dispatchEvent(e);
          }

          window.onload = function  (argument) {
            getByClass('header__nav-item')[0].addEventListener('mouseenter',moveTip)
            getByClass('header__nav-item')[1].addEventListener('mouseenter',moveTip)
            getByClass('header__nav-item')[2].addEventListener('mouseenter',moveTip)
            getByClass('header__nav-item')[3].addEventListener('mouseenter',moveTip)
            getByClass('header__nav-item')[4].addEventListener('mouseenter',moveTip)


            getByClass('header__nav-item')[0].addEventListener('click',moveScroll)
            getByClass('header__nav-item')[1].addEventListener('click',moveScroll)
            getByClass('header__nav-item')[2].addEventListener('click',moveScroll)
            getByClass('header__nav-item')[3].addEventListener('click',moveScroll)
            getByClass('header__nav-item')[4].addEventListener('click',moveScroll)


            getByClass('outline__item')[0].addEventListener('click',moveScroll)
            getByClass('outline__item')[1].addEventListener('click',moveScroll)
            getByClass('outline__item')[2].addEventListener('click',moveScroll)
            getByClass('outline__item')[3].addEventListener('click',moveScroll)
            getByClass('outline__item')[4].addEventListener('click',moveScroll)
          }

          
