import React, {Component} from 'react';
import classees from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom'; 

export default class Drawer extends Component {
   

   clickHandler = () => {
      this.props.onClose()
   }

   renderLinks(links) { 
      return links.map((link, index) => { 
         return(
            <li key={index}>
               <NavLink 
               to={link.to} 
               exact={link.exact}
               activeClassName={classees.active}
               onClick={this.clickHandler}
               >
                  {link.label}
               </NavLink>
            </li>
         )
      });
   }

   render() {
   
      const cls = [classees.Drawer];

      console.log(this.props)

      if(!this.props.isOpen) { 
         cls.push(classees.close)
      }

      const links = [
         {to: '/', label:'Спосок', exact: true}    
      ];

      if(this.props.isAuthenticated) { 
         links.push({to: '/quiz-creator', label:'Создать тест', exact: true});
         links.push({to: '/logout', label:'Выйти', exact: true});
      } else{ 
         links.push({to: '/auth', label:'Авторизация', exact: true})
      }

      return(
         <>
         <nav className={cls.join(' ')}>
            <ul>
               {this.renderLinks(links)}
            </ul>
         </nav>
         {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
         </>
      )
   }
}