import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config/config.service';
import { SvgPanZoomService } from '../../app/services/svg-pan-zoom.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  @ViewChild('customSVG') svg: ElementRef;
  productList :any =[];
  constructor(public navCtrl: NavController, public floorService: ConfigService, public svgZoom: SvgPanZoomService) {
    this.getData();
  }

  ngAfterViewInit(){
    this.svgZoom.getPanZoom(this.svg.nativeElement);
  }


  getData() {
    this.floorService.getFloorData()
      .subscribe((data) => {
        this.productList = data
      }
      );
}

highlightPath(list, index){
  for(let k=0; k < this.productList.length; k++){
    if(index == k){
      this.productList[k].isActive = true;
    }
    else {
      this.productList[k].isActive = false
    }
  }

  var maps = this.svg.nativeElement.querySelectorAll('.map__space');
  for(let i = 0; i < maps.length; i++){
    if(maps[i].hasAttribute("data-space")){      
      var dataSpace = maps[i].getAttribute("data-space");
        if(list.isActive && list.space == dataSpace) {
          maps[i].classList.add("map__space--selected");
        } 
        else {
          maps[i].classList.remove("map__space--selected");
        }
      }
  }  
}

  // classieLib = function () {
  //   var hasClass, addClass, removeClass;

  //   if ('classList' in document.documentElement) {
  //     hasClass = function (elem, c) {
  //       return elem.classList.contains(c);
  //     };
  //     addClass = function (elem, c) {
  //       elem.classList.add(c);
  //     };
  //     removeClass = function (elem, c) {
  //       elem.classList.remove(c);
  //     };
  //   }
  //   else {
  //     hasClass = function (elem, c) {
  //       return classReg(c).test(elem.className);
  //     };
  //     addClass = function (elem, c) {
  //       if (!hasClass(elem, c)) {
  //         elem.className = elem.className + ' ' + c;
  //       }
  //     };
  //     removeClass = function (elem, c) {
  //       elem.className = elem.className.replace(classReg(c), ' ');
  //     };
  //   }

  //   function toggleClass(elem, c) {
  //     var fn = hasClass(elem, c) ? removeClass : addClass;
  //     fn(elem, c);
  //   }

  //   function classReg(className) {
  //     return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  //   }

  //   var classie = {
  //     // full names
  //     hasClass: hasClass,
  //     addClass: addClass,
  //     removeClass: removeClass,
  //     toggleClass: toggleClass,
  //     // short names
  //     has: hasClass,
  //     add: addClass,
  //     remove: removeClass,
  //     toggle: toggleClass
  //   };

  //   return classie;
  // }

  // ngAfterViewInit() {
  //   // this.pins.nativeElement.click(function(e){
  //   //   console.log(e);
  //   // });  

  // //   function classs() {
  // //     // the mall element
  // //     var mall = document.querySelector('.mall'),
  // //       // mall´s levels wrapper
  // //       mallLevelsEl = mall.querySelector('.levels'),
  // //       // mall´s levels
  // //       mallLevels = [].slice.call(mallLevelsEl.querySelectorAll('.level')),
  // //       // total levels
  // //       //mallLevelsTotal = mallLevels.length,
  // //       // surroundings elems
  // //       mallSurroundings = [].slice.call(mall[0].querySelectorAll('.surroundings')),
  // //       // selected level position
  // //       selectedLevel,
  // //       // navigation element wrapper
  // //       mallNav = document.querySelector('.mallnav'),
  // //       // show all mall´s levels ctrl
  // //       //allLevelsCtrl = mallNav.querySelector('.mallnav__button--all-levels'),
  // //       // levels navigation up/down ctrls
  // //       //levelUpCtrl = mallNav.querySelector('.mallnav__button--up'),
  // //       //levelDownCtrl = mallNav.querySelector('.mallnav__button--down'),
  // //       // pins
  // //       pins = [].slice.call(mallLevelsEl.querySelectorAll('.pin')),
  // //       // content element
  // //       contentEl = document.querySelector('.content'),
  // //       // content close ctrl
  // //       contentCloseCtrl = contentEl.querySelector('button.content__button'),
  // //       // check if a content item is opened
  // //       isOpenContentArea,
  // //       // check if currently animating/navigating
  // //       isNavigating,
  // //       // check if all levels are shown or if one level is shown (expanded)
  // //       isExpanded,
  // //       // spaces list element
  // //       spacesListEl = document.getElementById('spaces-list'),
  // //       // spaces list ul
  // //       spacesEl = spacesListEl.querySelector('ul.list'),
  // //       // all the spaces listed
  // //       spaces = [].slice.call(spacesEl.querySelectorAll('.list__item > a.list__link')),
  // //       // reference to the current shows space (name set in the data-name attr of both the listed spaces and the pins on the map)
  // //       spaceref,
  // //       // sort by ctrls
  // //       sortByNameCtrl = document.querySelector('#sort-by-name'),
  // //       // listjs initiliazation (all mall´s spaces)
  // //       //spacesList = new List('spaces-list', { valueNames: ['list__link', { data: ['level'] }, { data: ['category'] } ]} ),

  // //       // smaller screens:
  // //       // open search ctrl
  // //       //openSearchCtrl = document.querySelector('button.open-search'),
  // //       // main container
  // //       containerEl = document.querySelector('.container'),
  // //       // close search ctrl
  // //       closeSearchCtrl = spacesListEl.querySelector('button.close-search');

  // //     function init() {
  // //       // init/bind events
  // //       initEvents();
  // //       showLevel(1);
  // //     }

  // //     /**
  // //      * Initialize/Bind events fn.
  // //      */
  // //     function initEvents() {
  // //       // hovering a pin / clicking a pin
  // //       pins.forEach(function (pin) {
  // //         var contentItem = contentEl.querySelector('.content__item[data-space="' + pin.getAttribute('data-space') + '"]');

  // //         pin.addEventListener('mouseenter', function () {
  // //           if (!isOpenContentArea) {
  // //             this.classie.add(contentItem, 'content__item--hover');
  // //           }
  // //         });
  // //         pin.addEventListener('mouseleave', function () {
  // //           if (!isOpenContentArea) {
  // //             this.classie.remove(contentItem, 'content__item--hover');
  // //           }
  // //         });
  // //         pin.addEventListener('click', function (ev) {
  // //           ev.preventDefault();
  // //           // open content for this pin
  // //           openContent(pin.getAttribute('data-space'));
  // //           // remove hover class (showing the title)
  // //           this.classie.remove(contentItem, 'content__item--hover');
  // //         });
  // //       });

  // //       // closing the content area
  // //       contentCloseCtrl.addEventListener('click', function () {
  // //         closeContentArea();
  // //       });

  // //       // clicking on a listed space: open level - shows space
  // //       spaces.forEach(function (space) {
  // //         var spaceItem = space.parentNode,
  // //           level = spaceItem.getAttribute('data-level'),
  // //           spacerefval = spaceItem.getAttribute('data-space');

  // //         space.addEventListener('click', function (ev) {
  // //           ev.preventDefault();
  // //           // for smaller screens: close search bar
  // //           closeSearch();
  // //           // open level
  // //           showLevel(level);
  // //           // open content for this space
  // //           openContent(spacerefval);
  // //         });
  // //       });

  // //       // smaller screens: open the search bar


  // //       // smaller screens: close the search bar
  // //       closeSearchCtrl.addEventListener('click', function () {
  // //         closeSearch();
  // //       });
  // //     }

  // //     /**
  // //      * Opens a level. The current level moves to the center while the other ones move away.
  // //      */
  // //     function showLevel(level) {
  // //       if (isExpanded) {
  // //         return false;
  // //       }

  // //       // update selected level val
  // //       selectedLevel = level;

  // //       // control navigation controls state
  // //       //setNavigationState();

  // //       this.classie.add(mallLevelsEl, 'levels--selected-' + selectedLevel);

  // //       // the level element
  // //       var levelEl = mallLevels[selectedLevel - 1];
  // //       this.classie.add(levelEl, 'level--current');

  // //       // hide surroundings element
  // //       hideSurroundings();

  // //     }

  // //     /**
  // //      * Shows all Mall´s levels
  // //      */
  // //     function showAllLevels() {
  // //       if (isNavigating || !isExpanded) {
  // //         return false;
  // //       }
  // //       isExpanded = false;

  // //       this.classie.remove(mallLevels[selectedLevel - 1], 'level--current');
  // //       this.classie.remove(mallLevelsEl, 'levels--selected-' + selectedLevel);
  // //       this.classie.remove(mallLevelsEl, 'levels--open');

  // //       // hide level pins
  // //       //removePins();

  // //       // shows surrounding element
  // //       showSurroundings();

  // //       // hide mall nav ctrls
  // //       hideMallNav();

  // //       // show back the complete list of spaces
  // //       //spacesList.filter();

  // //       // close content area if it is open
  // //       if (isOpenContentArea) {
  // //         closeContentArea();
  // //       }
  // //     }

  // //     /**
  // //      * Shows the level´s pins
  // //      */
  // //     function showPins(levelEl) {
  // //       var levelEl = levelEl || mallLevels[selectedLevel - 1];
  // //       this.classie.add(levelEl.querySelector('.level__pins'), 'level__pins--active');
  // //     }

  // //     /**
  // //      * Hide the navigation ctrls
  // //      */
  // //     function hideMallNav() {
  // //       this.classie.add(mallNav, 'mallnav--hidden');
  // //     }

  // //     /**
  // //      * Show the surroundings level
  // //      */
  // //     function showSurroundings() {
  // //       mallSurroundings.forEach(function (el) {
  // //         this.classie.remove(el, 'surroundings--hidden');
  // //       });
  // //     }

  // //     /**
  // //      * Hide the surroundings level
  // //      */
  // //     function hideSurroundings() {
  // //       mallSurroundings.forEach(function (el) {
  // //         this.classie.add(el, 'surroundings--hidden');
  // //       });
  // //     }

  // //     /**
  // //      * Opens/Reveals a content item.
  // //      */
  // //     function openContent(spacerefval) {
  // //       // if one already shown:
  // //       if (isOpenContentArea) {
  // //         hideSpace();
  // //         spaceref = spacerefval;
  // //         showSpace(true);
  // //       }
  // //       else {
  // //         spaceref = spacerefval;
  // //         openContentArea();
  // //       }

  // //       // remove class active (if any) from current list item
  // //       var activeItem = spacesEl.querySelector('li.list__item--active');
  // //       if (activeItem) {
  // //         this.classie.remove(activeItem, 'list__item--active');
  // //       }
  // //       // list item gets class active
  // //       this.classie.add(spacesEl.querySelector('li[data-space="' + spacerefval + '"]'), 'list__item--active');

  // //       // remove class selected (if any) from current space
  // //       var activeSpaceArea = mallLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
  // //       if (activeSpaceArea) {
  // //         this.classie.remove(activeSpaceArea, 'map__space--selected');
  // //       }
  // //       // svg area gets selected
  // //       this.classie.add(mallLevels[selectedLevel - 1].querySelector('svg > .map__space[data-space="' + spaceref + '"]'), 'map__space--selected');
  // //     }

  // //     /**
  // //      * Opens the content area.
  // //      */
  // //     function openContentArea() {
  // //       isOpenContentArea = true;
  // //       // shows space
  // //       showSpace(true);
  // //       // show close ctrl
  // //       this.classie.remove(contentCloseCtrl, 'content__button--hidden');
  // //       // resize mall area
  // //       this.classie.add(mall, 'mall--content-open');
  // //       // disable mall nav ctrls
  // //       //this.classie.add(levelDownCtrl, 'boxbutton--disabled');
  // //       // classie.add(levelUpCtrl, 'boxbutton--disabled');
  // //     }

  // //     /**
  // //      * Shows a space.
  // //      */
  // //     function showSpace(sliding) {
  // //       // the content item
  // //       var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');
  // //       // show content
  // //       this.classie.add(contentItem, 'content__item--current');
  // //       if (sliding) {
  // //         //onEndTransition(contentItem, function() {
  // //         this.classie.add(contentEl, 'content--open');
  // //         //});
  // //       }
  // //       // map pin gets selected
  // //       this.classie.add(mallLevelsEl.querySelector('.pin[data-space="' + spaceref + '"]'), 'pin--active');
  // //     }

  // //     /**
  // //      * Closes the content area.
  // //      */
  // //     function closeContentArea() {
  // //       this.classie.remove(contentEl, 'content--open');
  // //       // close current space
  // //       hideSpace();
  // //       // hide close ctrl
  // //       this.classie.add(contentCloseCtrl, 'content__button--hidden');
  // //       // resize mall area
  // //       this.classie.remove(mall, 'mall--content-open');
  // //       // enable mall nav ctrls
  // //       if (isExpanded) {
  // //         //	setNavigationState();
  // //       }
  // //       isOpenContentArea = false;
  // //     }

  // //     /**
  // //      * Hides a space.
  // //      */
  // //     function hideSpace() {
  // //       // the content item
  // //       var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');
  // //       // hide content
  // //       this.classie.remove(contentItem, 'content__item--current');
  // //       // map pin gets unselected
  // //       this.classie.remove(mallLevelsEl.querySelector('.pin[data-space="' + spaceref + '"]'), 'pin--active');
  // //       // remove class active (if any) from current list item
  // //       var activeItem = spacesEl.querySelector('li.list__item--active');
  // //       if (activeItem) {
  // //         this.classie.remove(activeItem, 'list__item--active');
  // //       }
  // //       // remove class selected (if any) from current space
  // //       var activeSpaceArea = mallLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
  // //       if (activeSpaceArea) {
  // //         this.classie.remove(activeSpaceArea, 'map__space--selected');
  // //       }
  // //     }

  // //     /**
  // //      * for smaller screens: open search bar
  // //      */
  // //     function openSearch() {
  // //       // shows all levels - we want to show all the spaces for smaller screens 
  // //       showAllLevels();

  // //       this.classie.add(spacesListEl, 'spaces-list--open');
  // //       this.classie.add(containerEl, 'container--overflow');
  // //     }

  // //     /**
  // //      * for smaller screens: close search bar
  // //      */
  // //     function closeSearch() {
  // //       this.classie.remove(spacesListEl, 'spaces-list--open');
  // //       this.classie.remove(containerEl, 'container--overflow');
  // //     }

  // //     init();
  // //   }
  // }

}