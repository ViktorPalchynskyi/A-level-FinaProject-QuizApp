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

      if(!this.props.isOpen) { 
         cls.push(classees.close)
      }

      const links = [
         {to: '/quiz', label:'Quiz List', exact: true}    
      ];

      if(this.props.isAuthenticated) { 
         links.push({to: '/quiz-creator', label:'Create quiz list', exact: true});
         links.push({to: '/logout', label:'Logout', exact: true});
      } else{ 
         links.push({to: '/register', label:'Register', exact: true})
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